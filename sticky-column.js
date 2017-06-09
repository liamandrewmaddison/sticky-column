var stickyColumn = function(options){

	var opts = {
		nonStickyColumn: $('.js-non-sticky-column'),
		stickyColumn: $('.js-sticky-column'),
	};

	$.extend(opts, options);

	var stickyColumnModule = {
		cacheDom: function(){
			this.$parent = opts.stickyColumn;
			this.$column = opts.nonStickyColumn;
		},
		bindEvents: function(){
			$(window).on('scroll', this.sticky.bind(this));
		},
		setStickVals: function(){
			this.$parentWidth = this.$parent.outerWidth();
			this.$parent.width(this.$parentWidth);
		},
		sticky: function(){
			//30 for paddings/margins
			var windowScroll = $(window).scrollTop();
			var parentPos = this.$column.offset().top - windowScroll;
			var parentHeight = this.$column.outerHeight();
			var parentScroll = windowScroll - this.$column.offset().top;
			var parentScrollHeight = parseInt(this.$column.outerHeight() - parentScroll);
			var columnHeight = this.$parent.outerHeight();
			var maxScrollable = parseInt((parentHeight - columnHeight) + this.$column.offset().top);
			if(parentScrollHeight-30 < columnHeight && this.$column.height() > this.$parent.height()){
				this.$parent.css({
					'position': 'absolute',
					'top': maxScrollable
				});
			}else{
				this.$parent.removeAttr('style');
				this.$parent.width(this.$parentWidth);
				this.$parent.removeClass('sticky');
			}
			if(30 > parentPos && this.$column.height() > this.$parent.height()){
				this.$parent.addClass('sticky');
			}else{
				this.$parent.removeClass('sticky');
			}
		},
		init: function(){
			this.cacheDom();
			//don't want this on mobile
			if ($(window).width() > 720) {
				this.setStickVals();
				this.bindEvents();
				console.log(this);
			}
		}
	};
	return stickyColumnModule.init();
};