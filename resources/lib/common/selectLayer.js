//独立的部门 菜单  的选择弹出层

function openDeptSelecter(pid,callback){
	
	layui.use(['form', 'table','layer','treeTable'], function () {
			var form = layui.form;
			var table = layui.table;
			var layer = layui.layer;
			var layuimini = layui.layuimini;
			var treeTable = layui.treeTable;
			var tableSelectIns;
			selDeptIndex = layer.open({
				type:1,
				title:"选择部门",
				content:'<span style="padding:5px"><table class="layui-hide" id="deptSelectTable" lay-filter="deptSelectTable"></table></span>',
				area:['700px','600px'],
				btn:['<span class="layui-icon layui-icon-ok"></span>确 定'],
				btnAlign:'c',
				yes:function(index){
					//得到选择的id和名称
					var ckData = tableSelectIns.checkStatus();
					callback(ckData[0].id,ckData[0].title);
					layer.close(selDeptIndex);
				},
				success:function(index){
					tableSelectIns=treeTable.render({
							   tree:{
								 iconIndex:2,//折叠图标显示在第几列
								 idName:'id',//自定义id字段的名称
								 pidName:'pid',//自定义表示是否还有子节点的名称
								 isPidData:true  //是否是pid形式数据
							   },
					     elem: '#deptSelectTable',
					     cellMinWidth:true,
					     cols: [
					         {type: "numbers"},
							 {type: "radio"},
					         {field: 'title',title: '部门名称'},
									{field: 'remark',title: '部门备注', align: "center"},
									{field: 'address',title: '部门地址', align: "center"},
					           ],
								reqData:function(data,callback){ 
									//在这里写ajax请求，通过callback回调表格数据
									$.get(api+'dept/loadAllDept',function(res){
										callback(res.data);//参数是数组类型
										tableSelectIns.setChecked(pid);//再次点击添加是，选中上次选择的部门id
									});
								}
					 });
				}
			});
	});
}

//添加菜单管理弹出层
function openMenuSelecter(pid,callback){
	layui.use(['form', 'table','layer','treeTable'], function () {
			var form = layui.form;
			var table = layui.table;
			var layer = layui.layer;
			var layuimini = layui.layuimini;
			var treeTable = layui.treeTable;
			var tableSelectIns;
			selDeptIndex = layer.open({
				type:1,
				title:"选择菜单",
				content:'<span style="padding:5px"><table class="layui-hide" id="deptSelectTable" lay-filter="deptSelectTable"></table></span>',
				area:['700px','600px'],
				btn:['<span class="layui-icon layui-icon-ok"></span>确 定'],
				btnAlign:'c',
				yes:function(index){
					//得到选择的id和名称
					var ckData = tableSelectIns.checkStatus();
					callback(ckData[0].id,ckData[0].title);
					layer.close(selDeptIndex);
				},
				success:function(index){
					tableSelectIns=treeTable.render({
							   tree:{
								 iconIndex:2,//折叠图标显示在第几列
								 idName:'id',//自定义id字段的名称
								 pidName:'pid',//自定义表示是否还有子节点的名称
								 isPidData:true  ,//是否是pid形式数据
								  openName:'spread'
							   },
					     elem: '#deptSelectTable',
					     cellMinWidth:true,
					     cols: [
					         {type: "numbers"},
					         {type: "radio"},
					         {field: 'title',title: '菜单名称'},
					     	 {field: 'type',title: '类型', align: "center",templet:function(d){
					     		if (d.type == 'topmenu') {
					     		    return '<span class="layui-badge layui-bg-green">顶部菜单</span>';
					     		}
					     		if (d.type == 'leftmenu') {
					     		    return '<span class="layui-badge layui-bg-blue">左侧菜单</span>';
					     		} else {
					     		    return '<span class="layui-badge-rim layui-bg-red">权限</span>';
					     		}
					     	}
					      },
					     	{field: 'typeCode',title: '编码', align: "center"}
					     ],
					     reqData:function(data,callback){ 
					     	//在这里写ajax请求，通过callback回调表格数据
					     	$.get(api+'menu/loadMenu?',function(res){
					     		callback(res.data);//参数是数组类型
					     		console.log(res.data);
								tableSelectIns.setChecked(pid);//再次点击添加是，选中上次选择的菜单id
					     	});
					     }
					 });
				}
			});
			
			
			
	});
	
}