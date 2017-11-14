
angular.module('AceApp')
	.provider('$gritter', function () {
		this.$get = function () {
			return {
				add: jQuery.gritter.add,
				remove: jQuery.gritter.remove,
				removeAll: jQuery.gritter.removeAll
			}
		}
	})
/**
.provider('$bootbox', function () {
	this.$get = function () {
		return {
			alert: bootbox.alert,
			confirm: bootbox.confirm,
			prompt: bootbox.prompt,
			dialog: bootbox.dialog,
			setDefaults: bootbox.setDefaults
		}
	}
});
*/

angular.module('AceApp').controller('ElementsCtrl', function ($scope, $timeout, $uibModal, $gritter) {
	$scope.tabShown = false;

	//there is no built-in support for 'tabs' on right or left or bottom, we do this using jQuery when content is loaded
	$scope.$on('$viewContentLoaded', function () {
		if (!jQuery) return;
		$timeout(function () {
			jQuery('#tab-below').addClass('tabs-below').find('.nav').appendTo('#tab-below');
			jQuery('#tab-left').addClass('tabs-left');
			jQuery('#tab-color').find('.nav').addClass('padding-12 tab-color-blue background-blue');

			$scope.tabShown = true;
		});
	});


	//for Accordion
	$scope.isOpen = [true, false, false];
	$scope.toggleOpen = function (index) {
		$scope.isOpen[index] = !$scope.isOpen[index];
		if ($scope.isOpen[index]) {
			for (var i = 0; i < $scope.isOpen.length; i++) if (i != index) $scope.isOpen[i] = false;
		}
	};


	//easy pie chart options and values
	$scope.easypiechart = [
		{
			"options": {
				barColor: '#D15B47',
				trackColor: '#EEEEEE',
				scaleColor: false,
				lineCap: 'butt',
				lineWidth: 8,
				size: 75
			},
			"value": 20
		},
		{
			"options": {
				barColor: '#87CEEB',
				trackColor: '#EEEEEE',
				scaleColor: false,
				lineCap: 'butt',
				lineWidth: 8,
				size: 75
			},
			"value": 55
		},
		{
			"options": {
				barColor: '#87B87F',
				trackColor: '#EEEEEE',
				scaleColor: false,
				lineCap: 'butt',
				lineWidth: 8,
				size: 75
			},
			"value": 90
		}];


	//alert boxes
	$scope.alert = {
		'shown': [true, true, true, true],
		'close': function (index) {
			$scope.alert.shown[index] = false;
		}
	};

	//gritter options
	//see js/directives/vendor.js as well
	$scope.gritter = {
		'count': 0,
		'light': false,
		'show': function (id) {
			var options = angular.copy($scope.gritter[id]);

			if (!('before_open' in options)) options.before_open = function () { $scope.gritter.count = $scope.gritter.count + 1 }
			if (!('after_close' in options)) options.after_close = function () { $scope.gritter.count = $scope.gritter.count - 1 }

			options['class_name'] = (options['class_name'] || '') + ($scope.gritter.light ? ' gritter-light' : '');

			$gritter.add(options);
		},
		'clear': function () {
			$gritter.removeAll();
			$scope.gritter.count = 0;
		},

		'regular': {
			title: '这是一个正常的通知！',
			text: '这个悬浮窗通知会在显示一段时间后自动消失。通知可以附含链接和文字。且通知中包含了头像。<a href="#" class="blue">信息链接</a>',
			image: $scope.$parent.ace.path.assets + '/avatars/avatar1.png'
		},
		'sticky': {
			title: '这是一个重要的通知！',
			text: '这个悬浮窗通知会一直显示，除非你主动关闭，或者移除消息。当然通知同样支持链接和文字。且通知中包含了头像。<a href="#" class="blue">信息链接</a>。注：如果标签sticky属性为true则通知会固定，不会自动消息。',
			image: $scope.$parent.ace.path.assets + '/avatars/avatar.png',
			sticky: true,
			class_name: 'gritter-info'
		},
		'without-image': {
			title: '这是一个不含图片的通知！',
			text: '通知会在显示一会儿后消失。通知中可含有链接和文字，但没有使用头像图片。',
			class_name: 'gritter-success'
		},
		'max-3': {
			title: '这是一个最多同时显示3个的通知！',
			text: '这个通知限制在同一时间只能显示3个，而且同样显示一段时间后自动消失。',
			image: $scope.$parent.ace.path.assets + '/avatars/avatar3.png',
			class_name: 'gritter-warning',
			before_open: function () {
				if ($scope.gritter.count >= 3) return false;
				$scope.gritter.count = $scope.gritter.count + 1
			}
		},
		'center': {
			title: '这是一个在屏幕中央显示的通知！',
			text: '这是一个在屏幕中央显示的通知，通知显示一会后会自动消失。注意在class_name属性中增加"gritter-center"的信息。',
			class_name: 'gritter-info gritter-center'
		},
		'error': {
			title: '这是一个警告消息的通知！',
			text: '这是一个警告消息的通知！通知未设置stick标记，所以显示一段时间后会消失。',
			class_name: 'gritter-error'
		}
	};

	//bootbox options
	//see js/directives/vendor.js as well
	$scope.bootbox = {
		'show': function (id) {
			var options = $scope.bootbox[id]
			$bootbox[options['type']].call(null, options);
		},

		'regular': {
			type: 'prompt',
			title: 'What is your name?',
			callback: function (result) { }
		},
		'confirm': {
			type: 'confirm',
			message: 'Are you sure?',
			callback: function (result) { }
		},
		'custom': {
			type: 'dialog',
			message: "<span class='bigger-110'>I am a custom dialog with smaller buttons</span>",
			buttons:
			{
				"success":
				{
					"label": "<i class='ace-icon fa fa-check'></i> Success!",
					"className": "btn-sm btn-success"
				},
				"danger":
				{
					"label": "Danger!",
					"className": "btn-sm btn-danger"
				},
				"click":
				{
					"label": "Click ME!",
					"className": "btn-sm btn-primary"
				},
				"button":
				{
					"label": "Just a button...",
					"className": "btn-sm"
				}
			}
		}
	};

	/////////////////
	$scope.openModal = function () {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'modalContent.html',
			controller: function ($scope, $uibModalInstance) {
				$scope.ok = function () {
					$uibModalInstance.close();
				};
				$scope.cancel = function () {
					$uibModalInstance.dismiss('cancel');
				};
			},
			//size: 'lg',
		});
	};

	$scope.dialog = function () {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'modalContent.html',
			controller: function ($scope, $uibModalInstance) {
				$scope.ok = function () {
					$uibModalInstance.close();
				};
				$scope.cancel = function () {
					$uibModalInstance.dismiss('cancel');
				};
			},
			//size: 'lg',
		});
	};
	//////////////////
	//Spin.js slider class names
	$scope.slider = {
		styles: ['', 'green', 'red', 'purple', 'orange', 'dark'],
		getStyle: function (index) {
			index = index % $scope.slider.styles.length;
			if (index > 0) return 'ui-slider-' + $scope.slider.styles[index];
		},

		options: {
			range: 'min'
		}
	};

	//we put values in a separate object so when values it is changed, "sliders" isn't changed! because if changed, sliders will be redrawn
	$scope.sliderValues = {
		lines: 12,
		length: 7,
		width: 4,
		radius: 10,
		corners: 1,
		rotate: 0,
		trail: 60,
		speed: 1
	};

	$scope.sliders = [
		{
			key:'lines',
			name: '线条数',
			min: 5, max: 16
		},
		{
			key:'length',
			name: '长度',
			min: 0, max: 30
		},
		{
			key:'width',
			name: '宽度',
			min: 2, max: 20
		},
		{
			key:'radius',
			name: '直径',
			min: 0, max: 40
		},
		{
			key:'corners',
			name: '圆角',
			min: 0, max: 1, step: 0.1,
		},
		{
			key:'rotate',
			name: '旋转',
			min: 0, max: 90
		},
		{
			key:'trail',
			name: '透明度',
			min: 10, max: 100
		},
		{
			key:'speed',
			name: '速度',
			min: 0.5, max: 2.2, step: 0.1
		}
	];



	//sample dropdown menus
	$scope.sampleDropdowns = [
		{
			list: [
				{ text: '第一个操作' },
				{ text: '另一个操作' },
				{ text: '剩余其他操作' },
				{ divider: true },
				{ text: '分割线' }
			]
		},

		{
			type: 'danger',
			list: [
				{ text: '第一个操作' },
				{ text: '另一个操作' },
				{ text: '剩余其他操作' },
				{ divider: true },
				{
					text: '更多选项',
					dropdown: {
						type: 'danger',
						list: [
							{ text: '第二级链接地址' },
							{ text: '第二级链接地址' },
							{ text: '第二级链接地址' },
							{ text: '第二级链接地址' },
							{ text: '第二级链接地址' }
						]
					}
				}
			]
		},

		{
			type: 'light',
			list: [
				{ text: '第一个操作' },
				{ text: '另一个操作' },
				{ text: '剩余其他操作' },
				{ divider: true },
				{
					text: '更多选项',
					dropup: true,
					dropdown: {
						type: 'light',
						list: [
							{ text: '第二级链接地址' },
							{ text: '第二级链接地址' },
							{ text: '第二级链接地址' },
							{ text: '第二级链接地址' },
							{ text: '第二级链接地址' }
						]
					}
				}
			]
		},

		{
			type: 'purple',
			list: [
				{ text: '第一个操作' },
				{ text: '另一个操作' },
				{ text: '剩余其他操作' },
				{ divider: true },
				{
					text: '更多选项',
					dropup: true,
					dropdown: {
						type: 'purple',
						right: true,
						list: [
							{ text: '第二级链接地址' },
							{ text: '第二级链接地址' },
							{ text: '第二级链接地址' },
							{ text: '第二级链接地址' },
							{ text: '第二级链接地址' }
						]
					}
				}
			]
		}
	];


});