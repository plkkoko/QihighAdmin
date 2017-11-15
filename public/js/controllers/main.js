angular.module('AceApp')
	//定义模块AceApp下的全局常量SAVE_SETTING
	.constant('SAVE_SETTING', true)

	//控制器MainController下的相关处理
	.controller('MainController', function ($scope, $rootScope, $http, $timeout, $location /**, cfpLoadingBar*/ ) {

		$rootScope.companyname = '某公司';
		$rootScope.appname = '办公管理平台';

		//some general variables
		$scope.ace = $scope.ace || {};
		$scope.ace.path = {
			'assets': 'assets' //used in page templates when linking to images, etc
		};

		$scope.ace.site = {
			brand_text: 'Ace Admin',
			brand_icon: 'fa fa-leaf',
			version: '1.4'
		};

		//sidebar variables
		$scope.ace.sidebar = {
			'minimized': false, //used to collapse/expand，设置菜单是否折叠
			'toggle': false, //used to toggle in/out mobile menu，设置菜单是否切换成手机样式菜单
			'reset': false //used to reset sidebar (for sidebar scrollbars, etc)，设置菜单是否重置
		};


		//viewContentLoading is used in angular/views/index.html to show/hide content and progress bar (spinner icon) when loading new pages
		//viewContentLoading用于标记index.html文件是否处于加载页面或数据的状态。
		//默认viewContentLoading值为false
		$rootScope.viewContentLoading = false;
		//当触发stateChangeStart事件时，设置viewContentLoading为true
		$rootScope.$on('$stateChangeStart', function (event) {
			//cfpLoadingBar.start();
			$rootScope.viewContentLoading = true;

			//also hide sidebar in mobile view when navigating to a new state
			//如果在手机视图下，当状态变更时则隐藏菜单栏位
			$scope.ace.sidebar.toggle = false;
		});
		$rootScope.$on('$stateChangeSuccess', function (event) {
			//cfpLoadingBar.complete();
			//当加载完成时，更新viewContentLoading状态为false
			$rootScope.viewContentLoading = false;
		});
		$rootScope.$on('$stateChangeError', function (event, p1, p2, p3) {
			//cfpLoadingBar.complete();
			//当加载出现异常时时，更新viewContentLoading状态为false
			$rootScope.viewContentLoading = false;
		});


		//this function is used in body's ng-class directive to determine and apply selected user skin!
		//根据当前的skinIndex，切换到相应的皮肤变好，并通过body标签的ng-class属性控制皮肤类型的切换
		$scope.bodySkin = function () {
			var skin = $scope.ace.settings.skinIndex;
			if (skin == 1 || skin == 2) return 'skin-' + skin;
			else if (skin == 3) return 'no-skin skin-3';
			return 'no-skin';
		};

		/////


		//in templates with use 'getData' to retrieve data dynamically and cache them for later use! data is located inside 'angular/data' folders
		//you don't need this and it's only a convenience for this demo
		//example: getData('comments', 'dashboard')
		//如果在模板中使用getData动态的取回数据加载到缓存，并在稍后使用。数据文件保存在本地的angular/data文件夹下
		//你并不需要这部分，这只是为了便于这个模板运行。
		//示例：getData('comments', 'dashboard')
		$rootScope.appData = $rootScope.appData || {};
		$rootScope.appDataRequest = {};
		//定义getData全局函数
		$rootScope.getData = function (dataName, type) {
			var type = type || 'page';
			var dataKey = null,
				dataPath = null;
			if (type == 'page') {
				var pageName = $location.path().match(/([\-a-z]+)$/)[0];
				dataKey = 'page-' + pageName + '-' + dataName;
				dataPath = 'data/pages/' + pageName + '/' + dataName + '.json';
			} else {
				dataKey = type + '-' + dataName;
				dataPath = 'data/' + type + '/' + dataName + '.json';
			}

			//如果dataPath为空则直接返回
			if (!dataPath) return;
			//如果dataKey在全局变量appData中，则使用全局变量中的相应键值
			if (dataKey in $rootScope.appData) return $rootScope.appData[dataKey];
			//如果dataKey不在全局变量appData和appDataRequest中，则如下处理
			if (!(dataKey in $rootScope.appData) && !(dataKey in $rootScope.appDataRequest)) {
				$rootScope.appDataRequest[dataKey] = true;
				//使用http服务获取相应路径的json文件内容
				$http.get(dataPath).success(function (data) {
					$rootScope.appData[dataKey] = data;
				});
			}
		};
		
		$rootScope.getCommonData = function (dataName) {
			return $rootScope.getData(dataName, 'common');
		};


	});


//This controller responds to settings box changes
//控制器SettingsCtrl下的相关处理
angular.module('AceApp').controller('SettingsCtrl', function ($scope, $timeout, SAVE_SETTING, $localStorage, StorageGet) {
	$scope.ace = $scope.$parent.ace;
	$scope.ace.settings = $scope.ace.settings || {};

	if (SAVE_SETTING) $localStorage['ace.settings'] = $localStorage['ace.settings'] || {};

	$scope.ace.settings = {
		'is_open': false,
		'open': function () {
			$scope.ace.settings.is_open = !$scope.ace.settings.is_open;
		},

		'navbar': false,
		'sidebar': false,
		'breadcrumbs': false,
		'hover': false,
		'compact': false,
		'highlight': false,

		//'rtl': false,

		'skinColor': '#438EB9',
		'skinIndex': 0
	};


	if (SAVE_SETTING) StorageGet.load($scope, 'ace.settings'); //load previously saved setting values


	//watch some of the changes to trigger related events required by sidebar, etc
	$scope.$watch('ace.settings.navbar', function (newValue) {
		if (newValue == false) {
			//if navbar is unfixed, so should be sidebar and breadcrumbs
			$scope.ace.settings.sidebar = $scope.ace.settings.breadcrumbs = false;
		}
		$timeout(function () {
			if (jQuery) jQuery(document).trigger('settings.ace', ['navbar_fixed', newValue]);
		});

		if (SAVE_SETTING) $localStorage['ace.settings']['navbar'] = newValue;
	});
	$scope.$watch('ace.settings.sidebar', function (newValue) {
		if (newValue === true) {
			//if sidebar is fixed, so should be navbar
			$scope.ace.settings.navbar = true;
		} else if (newValue === false) {
			//if sidebar is unfixed, so should be breadcrumbs
			$scope.ace.settings.breadcrumbs = false;
		}
		$timeout(function () {
			if (jQuery) jQuery(document).trigger('settings.ace', ['sidebar_fixed', newValue]);
		});

		if (SAVE_SETTING) $localStorage['ace.settings']['sidebar'] = newValue;
	});
	$scope.$watch('ace.settings.breadcrumbs', function (newValue) {
		if (newValue === true) {
			//if breadcrumbs is fixed, so should be sidebar
			$scope.ace.settings.sidebar = true;
		}
		$timeout(function () {
			if (jQuery) jQuery(document).trigger('settings.ace', ['breadcrumbs_fixed', newValue]);
		});

		if (SAVE_SETTING) $localStorage['ace.settings']['breadcrumbs'] = newValue;
	});
	$scope.$watch('ace.settings.container', function (newValue) {
		$timeout(function () {
			if (jQuery) jQuery(document).trigger('settings.ace', ['main_container_fixed', newValue]);
		});

		if (SAVE_SETTING) $localStorage['ace.settings']['container'] = newValue;
	});

	//////
	$scope.$watch('ace.settings.compact', function (newValue) {
		if (newValue === true) {
			//if sidebar is compact, it should be in 'hover' mode as well
			$scope.ace.settings.hover = true;
		}
		$timeout(function () {
			//reset sidebar scrollbars and submenu hover
			$scope.$parent.ace.sidebar.reset = true;
		}, 500);

		if (SAVE_SETTING) $localStorage['ace.settings']['compact'] = newValue;
	});
	$scope.$watch('ace.settings.hover', function (newValue) {
		if (newValue === false) {
			//if sidebar is not 'hover' , it should not be compact
			$scope.ace.settings.compact = false;
		}
		$timeout(function () {
			//reset sidebar scrollbars and submenu hover
			$scope.$parent.ace.sidebar.reset = true;
		}, 500);

		if (SAVE_SETTING) $localStorage['ace.settings']['hover'] = newValue;
	});
	$scope.$watch('ace.settings.highlight', function (newValue) {
		if (SAVE_SETTING) $localStorage['ace.settings']['highlight'] = newValue;
	});

	////

	$scope.$watch('ace.settings.skinIndex', function (newValue) {
		//save skinIndex for later
		if (SAVE_SETTING) $localStorage['ace.settings']['skinIndex'] = newValue;
	});

});


//Sidebar Controller
//控制器SidebarCtrl下的相关处理，菜单初始化处理逻辑
app.controller('SidebarCtrl', function ($scope, $state, $rootScope, $timeout, SidebarList, SAVE_SETTING, $localStorage, StorageGet) {
	//将当前控制器SidebarCtrl下变量ace取值为上级控制器MainController下变量ace。
	$scope.ace = $scope.$parent.ace;

	$scope.ace.sidebar = $scope.ace.sidebar || {};

	if (SAVE_SETTING) {
		StorageGet.load($scope, 'ace.sidebar'); //load previously saved sidebar properties
		$scope.$watch('ace.sidebar.minimized', function (newValue) {
			$localStorage['ace.sidebar']['minimized'] = newValue;
		});
	}


	////
	//make a list of sidebar items using router states in angular/js/app.js
	$scope.sidebar = SidebarList.getList($state.get());

	//these are used to determine if a sidebar item is 'open' or 'active'
	$rootScope.subMenuOpen = {};
	$rootScope.isSubOpen = function (name) {
		if (!(name in $rootScope.subMenuOpen)) $rootScope.subMenuOpen[name] = false;
		return $rootScope.subMenuOpen[name];
	}
	$rootScope.isActiveItem = function (name) {
		return $rootScope.activeItems ? $rootScope.activeItems[name] : false;
	}

});


//nothing important, just a snippet to convert ui.router states into an array of sidebar items to be used in the partial template (sidebar.html)
//make a list of sidebar items using router states in angular/js/app.js
//没什么，只是一个将ui.router模块中的states转换成侧边栏菜单数组项，并将该数组用于子模板（sidebar.html）的片段
//自定义服务SidebarList
app.service('SidebarList', function () {
	//parent name for a state
	//从菜单名称获取父级菜单名称
	var getParentName = function (name) {
		var name = (/^(.+)\.[^.]+$/.exec(name) || [null, null])[1];
		return name;
	};
	//how many parents does this state have?
	var getParentCount = function (name) {
		return name.split('.').length;
	};

	this.getList = function (uiStateList) {
		//初始化变量sidebar为一个对象，并定义成员root值为空数组
		var sidebar = {
			'root': []
		}; //let's start with root and call it root! (see views/layouts/default/partial/sidebar.html)
		//初始化变量parentList为一个空对象
		var parentList = {}; //each node(item) can be a parent, so we add it to this list, and later if we find its children we know where to find the parent!

		for (var i = 0; i < uiStateList.length; i++)
		//for(state in uiStateList)
		{
			var state = uiStateList[i];
			//如果当前state未定义name则跳出本次循环
			if (!state.name) continue;

			//copy state to 'item' (so state is not changed)
			var item = {};
			angular.copy(state, item);
			//去除须加载对象信息
			delete item['resolve'];
			//去除须加载的文件路径
			delete item['templateUrl']; //delete these, we don't need them

			//item.name is state's name (dashboard, ui.elements, etc)
			//设置item的url值为item.name
			item.url = item.name || '';
			//将当前对象添加到parentList的成员中，以便后续该对象被当做父级菜单做处理
			parentList[item.name] = item; //save this item as a possible parent, and later we add possible children to it as submenu
			//调用函数根据当前节点名称获取父级节点名称
			var parentName = getParentName(item.name);
			if (!parentName) {
				//no parent, so a root item
				//如果没有父级菜单，则将item作为根菜单处理，使用数组的push方法将当前item追加到root末尾
				sidebar.root.push(item);
				//设置当前项目的层级为1值为true
				item['level-1'] = true;
			} else {
				//get the parent and add this item as a submenu element of parent
				//如果存在父级菜单，根据父节点名称从parentList数组中获取父节点，并将父级菜单赋值为parentNode对象
				var parentNode = parentList[parentName];
				//如果parentNode没有submenu成员，则定义父节点的submenu成员为空数组
				if (!('submenu' in parentNode)) parentNode['submenu'] = [];
				//向父节点的submenu数组末尾追加item
				parentNode['submenu'].push(item);
				//根据当前节点的名称（名称中点的数量加1），确定菜单的层级
				item['level-' + getParentCount(item.name)] = true;
			}
		}

		parentList = null;

		return sidebar;
	};

});

//just load localStorage stored values, such as ace.settings, or ace.sidebar
//自定义服务StorageGet
app.service('StorageGet', function ($localStorage) {

	this.load = function ($scope, name) {
		$localStorage[name] = $localStorage[name] || {};

		var $ref = $scope;
		var parts = name.split('.'); //for example when name is "ace.settings" or "ace.sidebar"
		for (var i = 0; i < parts.length; i++) $ref = $ref[parts[i]];
		//now $ref refers to $scope.ace.settings

		for (var prop in $localStorage[name])
			if ($localStorage[name].hasOwnProperty(prop)) {
				$ref[prop] = $localStorage[name][prop];
			}
	};

});