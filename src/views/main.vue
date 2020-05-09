<template>
    <!-- 想写子路由但是时间有点紧就直接一个vue了 -->
    <el-container style="height: 500px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu :default-openeds="['1', '3']">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>商品总览</template>
                    <!-- <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="1-1" @click="changeAnthor">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="1-4-1">选项4-1</el-menu-item>
                    </el-submenu> -->
                </el-submenu>
                <el <el-submenu index="2">
                    <template slot="title"><i class="el-icon-menu"></i>我的功能</template>
                    <el-menu-item-group>

                        <el-menu-item index="2-1" @click="release_com">发布商品</el-menu-item>
                        <el-menu-item index="2-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="2-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="2-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="2-4-1">选项4-1</el-menu-item>
                    </el-submenu>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-setting"></i>导航三</template>
                        <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <el-menu-item index="3-1">选项1</el-menu-item>
                            <el-menu-item index="3-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="3-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="3-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="3-4-1">选项4-1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
            </el-menu>
        </el-aside>

        <!-- 添加商品对话框 -->
        <el-dialog title="发布商品" :visible.sync="dialogFormVisible">
            <el-form :model="commodityForm" label-width="100px" class="demo-ruleForm" :rules="rules"
                ref="commodityForm">
                <el-form-item label="商品名称" prop="comName">
                    <el-input v-model="commodityForm.comName"></el-input>
                </el-form-item>
                <!-- maxlength="8" oninput = "value=value.replace(/[^\d.]/g,'')" -->
                <!-- 目前只能输入整数 -->
                <!-- <el-form-item label="商品的价格" prop="comPrice" type="number">
                    <el-input  v-model.number="commodityForm.comPrice"></el-input>
                </el-form-item> -->
                <el-form-item label="商品的价格" prop="comPrice" type="number">
                    <el-input v-model.number="commodityForm.comPrice"></el-input>
                </el-form-item>
                <el-form-item label="商品的描述" prop="comDescribe">
                    <el-input v-model="commodityForm.comDescribe"></el-input>
                </el-form-item>

                <el-form-item label="发布时间" prop="comReleaseTime">
                    <div class="block">
                        <el-date-picker v-model="commodityForm.comReleaseTime" type="datetime" placeholder="选择日期时间"
                            align="right" :picker-options="pickerOptions" format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                    </div>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('commodityForm')">立即创建</el-button>
                    <el-button @click="resetForm('commodityForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 下订单对话框 -->
        <!-- 需要输入正确交易时间和地点 -->
        <el-dialog title="选择订单交易详细信息" :visible.sync="changeFromVisible">
            <el-form :model="dealForm" label-width="100px" class="demo-ruleForm" :rules="changeRules"
                ref="changeCommodityForm">
                <el-form-item label="商品交易地点" prop="comName">
                    <el-input v-model="dealForm.dealLocation"></el-input>
                </el-form-item>
                <el-form-item label="商品交易时间" prop="comReleaseTime">
                    <div class="block">
                        <el-date-picker v-model="dealForm.dealChangeTime" type="datetime" placeholder="选择日期时间"
                            align="right" :picker-options="pickerOptions" format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                    </div>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="buyCommodity('commodityForm')">立即创建</el-button>
                    <el-button @click="resetForm('commodityForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-container>
            <el-header style="text-align: right; font-size: 12px">


                <!-- <template>
                    <div>
                        <el-input placeholder="输入想要搜索的名称" size="small"></el-input>
                    </div>
                </template>> -->
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>查看</el-dropdown-item>
                        <el-dropdown-item>新增</el-dropdown-item>
                        <el-dropdown-item>删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>{{msg.username}}</span>
            </el-header>

            <!-- 商品浏览主页 -->
            <el-main>
                <el-table :data="commodities">
                    <!-- <el-table-column prop="id" label="日期" width="140">
                    </el-table-column> -->
                    <el-table-column prop="comName" label="商品名称" width="120">
                    </el-table-column>
                    <el-table-column prop="comDescribe" label="商品描述" width="120">
                    </el-table-column>
                    <el-table-column prop="comPrice" label="商品价格">
                    </el-table-column>
                    <el-table-column prop="comReleaseTime" label="商品发布时间">
                    </el-table-column>
                    <el-table-column prop="comStatus" label="商品状态">
                    </el-table-column>
                    <!-- :prop="comID" -->
                    <el-table-column label="进行操作">
                        <template slot-scope="scope">
                            <el-button type="success" @click="buyCommodity(scope.row.comID)">点击购买</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </el-container>
</template>
<style>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>

<script>
    export default {
        data() {
            const item = {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            };
            return {

                //对话框可视数据
                //添加商品对话框是否可见
                dialogFormVisible: false,
                //下订单对话框是否可见
                changeFromVisible: false,

                tableData: Array(20).fill(item),

                //路由传递数据
                msg: this.$route.query.data,
                item: {
                    date: '2016-05-02',
                    name: '王虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                // books: [{
                //     id: 12,
                //     name: "fadfa",
                //     price: 12.32
                // }, ],
                //商品列表
                commodities: [{
                    id: "",
                    name: "",
                    describe: "",
                    price: "",
                    releasetime: "",
                    status: ""

                }],



                //创建商品对话框的检验规则
                rules: {
                    comName: [{
                            required: true,
                            message: '请输入商品名称',
                            trigger: 'blur'
                        },
                        {
                            min: 1,
                            max: 10,
                            message: '长度在 1 到 10 个字符',
                            trigger: 'blur'
                        }
                    ],
                    comDescribe: [{
                            required: true,
                            message: '请输入商品描述信息，以便交易更快成功',
                            trigger: 'blur'
                        },
                        {
                            min: 1,
                            max: 20,
                            message: '长度在 1 到 20 个字符',
                            trigger: 'blur'
                        }
                    ],
                    comPrice: [{
                            required: true,
                            message: '价格不能为空'
                        },
                        {
                            type: 'number',
                            message: '价格必须为数字值'
                        }
                    ],
                    comReleaseTime: [{
                        // type: 'date',
                        required: true,
                        message: '请选择发布时间',
                        trigger: 'change'
                    }],
                },

                //交易对话框规则
                changeRules: {

                },

                //添加商品表单
                commodityForm: {
                    comName: "",
                    comDescribe: '',
                    comPrice: "",
                    comReleaseTime: '',

                },

                //订单元素表单
                dealForm: {
                    //地点
                    dealLocation:"",
                    //交易时间
                    dealChangeTime:"",

                },

                //下订单表单
                changeCommodityForm: {

                },

                //时间选择器
                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                value1: '',
                value2: '',
                value3: ''
                // 
            }
        },
        created() {
            //alert(this.msg)
            alert("欢迎您:" + this.msg.username)
            console.log(this.msg)
            var _this = this
            axios.get('http://localhost:9090/commodity/findallcommodity').then(function (response) {
                console.log(response)
                _this.commodities = response.data
                // console.log(response)
            })
        },
        methods: {
            changeAnthor() {
                alert("hello")
                this.tableData = null
            },
            release_com() {
                // alert("ok")
                this.dialogFormVisible = true
            },

            //打开交易商品对话框
            buyCommodity(id) {
                console.log(id)
                this.changeFromVisible = true
            },

            //判断提交表单是否为空,vaildate不会用
            isFormNull() {
                if (this.commodityForm.price == null || this.commodityForm.name == null || this.commodityForm
                    .describe == null || this.commodityForm.comReleaseTime == null) {
                    return true
                } else {
                    return false
                }
            },

            //提交创建
            submitForm(formName) {
                console.log(this.commodityForm)

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                        //序列化json
                        var sendJson = JSON.stringify(this.commodityForm);
                        var senduser = JSON.stringify(this.msg)


                        axios({
                            //发送http请求
                            method: 'post',
                            url: 'http://localhost:9090/commodity/addcommodity',
                            crossDomain: true,
                            //以map形式发送
                            data: {
                                "com": sendJson,
                                "user": senduser
                            }

                            ,
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then(response => {
                            // //对返回数据进行处理
                            // console.log(response)
                            // let res_data = response.data
                            // console.log(res_data)
                            // if (res_data.id == -1) {
                            //     alert("用户名已存在，请重新起名")
                            // } else {
                            //     alert("注册成功，您的用户id为：" + res_data.id)

                            //     this.$router.push({
                            //         path: "/success",
                            //         query: {
                            //             data: res_data
                            //         }
                            //     })
                            // }

                        })

                        //刷新
                        location.reload();
                        this.dialogFormVisible = false

                    } else {
                        alert("请注意输入")
                    }
                    // } else {
                    //     console.log('error submit!!');
                    //     return false;
                    // }
                });

                //如果不空
                // if (!this.isFormNull) {
                //     //序列化json
                //     var sendJson = JSON.stringify(this.commodityForm);
                //     var senduser = JSON.stringify(this.msg)


                //     axios({
                //         //发送http请求
                //         method: 'post',
                //         url: 'http://localhost:9090/codity/addcommodity',
                //         crossDomain: true,
                //         //以map形式发送
                //         data: {
                //             "com": sendJson,
                //             "user": senduser
                //         }

                //         ,
                //         headers: {
                //             'Content-Type': 'application/json;charset=UTF-8'
                //         }
                //     }).then(response => {
                //         // //对返回数据进行处理
                //         // console.log(response)
                //         // let res_data = response.data
                //         // console.log(res_data)
                //         // if (res_data.id == -1) {
                //         //     alert("用户名已存在，请重新起名")
                //         // } else {
                //         //     alert("注册成功，您的用户id为：" + res_data.id)

                //         //     this.$router.push({
                //         //         path: "/success",
                //         //         query: {
                //         //             data: res_data
                //         //         }
                //         //     })
                //         // }

                //     })
                // } else {
                //     alert("请注意输入不能为空")
                // }



            },

            //重置表格
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    };
</script>