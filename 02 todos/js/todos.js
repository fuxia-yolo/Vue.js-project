/*
	需求：
	1 当在输入框中输入完内容后按回车键 当前内容展示到页面上
	2 点击三角 实现全选和全不选功能
	3 点击叉号实现删除功能
	4 双击标题实现编辑功能
	5 删除已完成项
	6 统计未完成项
	7 只看未完成项
	8 只看已完成项
*/

var vue = new Vue({
	// 挂载点
	el: '#todoapp',
	// 数据
	data: {
		// 标志位
		flag: true,
		flag1: true,
		todos: [{
			id: 1,
			title: '吃饭',
			completed: false,
			done: false
		}, {
			id: 2,
			title: '睡觉',
			completed: false,
			done: false
		}, {
			id: 3,
			title: '打豆豆',
			completed: true,
			done: true
		}],
		// 标识符默认为空 即一开始加载时 类名 editing 不加载
		currentEditing: null
	},
	// 计算属性
	computed: {
		// 全选功能
		toggleStatus: {
			/*
				当读取变量时候会触发它的 getter
				当修改该变量时会触发它的 setter
			*/
			get() {
				/*
					3.4 所有 li 都处于选中状态 toggle-all 复选框选中
						有一个没有选中 则 toggle-all 复选框未选中
				*/
				// item.completed 都为 true 时 return true
				return this.todos.every(item => item.completed);
			},
			// 当复选框选中时 传入的为 true 没有选中传入的为 false
			set(val) {
				this.todos.forEach(item => item.completed = val);
			}
		},
		// 通过计算属性检测当前 complete 未完成的状态
		leftCount: function () {
			return this.todos.filter(item => !item.completed).length;
		}
	},
	// 方法
	methods: {
		// 添加任务
		addTodo(e) {
			// 1 获取文本框中用户输入的数据
			var todoText = e.target.value.trim();
			// 2 判断数据是否为空
			if (!todoText.length) {
				alert('请先输入任务！');
				e.target.value = '';
				return
			}
			// 3 添加到数组
			// 判断数组中是否有元素
			const lastTodo = this.todos[this.todos.length - 1];
			const id = lastTodo ? lastTodo.id + 1 : 1;
			this.todos.push({
				id,
				title: todoText,
				completed: false
			});
			// 4 清空输入框
			e.target.value = '';
		},
		// 删除功能
		removeTodo(delIndex) {
			// 点击当前按钮 删除当前按钮所在的 li
			this.todos.splice(delIndex, 1);
		},
		// 编辑功能
		saveEdit(item, index, e) {
			/**
			 * 拿到文本框中的数据
			 * 非空校验
			 * 为空 删除 item
			 * 不为空 修改 title
			 */
			var editText = e.target.value.trim();
			!editText.length ? this.todos.splice(index, 1) : item.title = editText;
			// 去除 editing 样式
			this.currentEditing = null;
		},
		// 删除已完成项
		removeAllDone() {
			// 把所有需要保留的数据过滤出来 然后重新赋值给 todos
			this.todos = this.todos.filter(item => !item.completed);
		},
		// 未完成项
		undone() {
			if (this.flag1) {
				this.flag = false;
				this.todos.forEach(item => item.done = !item.done);
				this.flag1 = !this.flag1;
			}
		},
		// 已完成项
		done() {
			if (!this.flag1) {
				this.flag = false;
				this.todos.forEach(item => item.done = !item.done);
				this.flag1 = !this.flag1;
			}
		},
		// 所有项
		all() {
			this.flag = true;
		}
	}
});