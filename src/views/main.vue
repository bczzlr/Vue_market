<template>
    <!-- 想写子路由但是时间有点紧就直接一个vue了 -->
    <el-container style="height: 500px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu>
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
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-menu"></i>我的功能</template>
                    <el-menu-item-group>

                        <el-menu-item index="2-1" @click="release_com">发布商品</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="正在进行中的交易">

                        <el-menu-item index="2-2" @click="view_my_commodity">查看我的发布</el-menu-item>

                        <el-menu-item index="2-2" @click="view_my_bought">查看我的购买</el-menu-item>

                        <!-- <el-menu-item index="2-2" @click="">查看我的评价</el-menu-item> -->
                    </el-menu-item-group>

                </el-submenu>
                <el-submenu index="3">
                    <template slot="title"><i class="el-icon-setting"></i>历史交易</template>
                    <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="3-1" @click="view_my_history_bought">查看我的历史购买</el-menu-item>
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

        <!-- 查看评价对话框 -->
        <el-dialog title="评价历史" :visible.sync="dialogHistoryBoughtTableVisible">
            <el-table :data="user_eval_list">
                <el-table-column property="c_name" label="商品名称"></el-table-column>
                <el-table-column property="c_price" label="商品金额"></el-table-column>
                <el-table-column property="c_name" label="对方姓名"></el-table-column>
                <el-table-column label="评价" width="200">
                    <template slot-scope="scope">
                        <!-- 传入商品id
                        <el-button type="success" @click="openEvalDialog(scope.row.c_id,scope.row.d_id)">
                            确认收货并评论</el-button> -->
                        <el-rate v-model="scope.row.e_starts" :colors="colors">
                        </el-rate>
                        <!-- <el-rate v-model="scope.row.e_starts"  show-score text-color="#ff9900" score-template="{scope.row.e_starts}">
                        </el-rate> -->
                        
                    </template>
                </el-table-column>
                
                <el-table-column property="d_location" label="地址"></el-table-column>
                <el-table-column property="e_comment" label="评论"></el-table-column>
                <el-table-column property="d_time" label="交易时间"></el-table-column>
            </el-table>
        </el-dialog>

        <!-- 查看我的购买对话框 -->
        <el-dialog title="我的购买" :visible.sync="dialogMyBoughtVisible">
            <el-table :data="user_deal_list">
                <el-table-column property="d_location" label="交易地点"></el-table-column>
                <el-table-column property="d_time" label="交易时间"></el-table-column>
                <el-table-column property="d_tele" label="买家电话"></el-table-column>
                <el-table-column property="c_prive" label="交易金额"></el-table-column>
                <el-table-column property="c_name" label="商品名称"></el-table-column>
                <el-table-column property="c_describe" label="商品细节"></el-table-column>
                <el-table-column property="u_name" label="交易对象名称"></el-table-column>
                <el-table-column label="进行操作">
                    <template slot-scope="scope">
                        <!-- 传入商品id -->
                        <el-button type="success" @click="openEvalDialog(scope.row.c_id,scope.row.d_id)">
                            确认收货并评论</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>


        <!-- 查看我的发布商品对话框 -->
        <el-dialog title="我的发布" :visible.sync="dialogMyCommodityVisible">
            <el-table :data="user_commodities_list">
                <el-table-column property="comName" label="商品名称" width="100"></el-table-column>
                <el-table-column property="comPrice" label="商品价格" width="100"></el-table-column>
                <el-table-column property="comReleaseTime" label="商品发布时间"></el-table-column>
                <el-table-column label="进行操作">
                    <template slot-scope="scope">
                        <!-- 传入商品id -->
                        <el-button type="success" @click="check_users_com_status(scope.row.comID)">
                            {{scope.row.comStatus | jugementStatus}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>

        <!-- 相关订单信息对话框 -->
        <el-dialog title="收货地址" :visible.sync="dialogDealInfoVisible">
            <el-table :data="dealinfo">
                <!-- <el-table-column label="交易地点" width="180">
                    <template slot-scope="scope">
                        <span>{{scope.row.dealLocation}}</span>
                    </template>
                </el-table-column> -->
                <el-table-column property="dealLocation" label="交易地点" width="100"></el-table-column>

                <el-table-column property="username" label="买家姓名" width="100"></el-table-column>
                <el-table-column property="dealBuyerTelephone" label="买家电话" width="100"></el-table-column>
                <el-table-column property="dealChangeTime" label="交易时间" width="100"></el-table-column>

            </el-table>
        </el-dialog>

        <!-- 评价对话框 -->
        <el-dialog title="进行评价" :visible.sync="dialogEvalFormVisible">
            <el-form :model="evalForm" :rules="evalRule" ref="evalForm">
                <el-form-item label="评价" :label-width="formLabelWidth" prop="evalComment">
                    <el-input v-model="evalForm.evalComment" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="订单星级" :label-width="formLabelWidth">
                    <!-- <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select> -->
                    <el-rate v-model="evalForm.evalStars" show-text prop="evalStars">
                    </el-rate>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('evalForm')">重置</el-button>
                <el-button type="primary" @click="evaling">确 定</el-button>
            </div>
        </el-dialog>

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
            <el-form :model="dealForm" label-width="100px" class="demo-ruleForm" :rules="dealRules" ref="dealForm">
                <el-form-item label="购买人联系电话">
                    <el-input v-model.number="dealForm.dealBuyerTelephone" prop="dealBuyerTelephone" type="number">
                    </el-input>
                </el-form-item>
                <el-form-item label="商品交易地点" prop="dealLocation">
                    <el-input v-model="dealForm.dealLocation"></el-input>
                </el-form-item>
                <el-form-item label="商品交易时间" prop="dealChangeTime">
                    <div class="block">
                        <el-date-picker v-model="dealForm.dealChangeTime" type="datetime" placeholder="选择日期时间"
                            align="right" :picker-options="pickerOptions" format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                    </div>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="buyCommodity('dealForm')">立即创建</el-button>
                    <el-button @click="resetForm('dealForm')">重置</el-button>
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
                        <el-dropdown-item>登出</el-dropdown-item>
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
                            <!-- 传入商品id -->
                            <el-button type="success" @click="buyCommodityDiaOpen(scope.row.comID)">点击购买</el-button>
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

                //用户发布商品对话框是否可见
                dialogMyCommodityVisible: false,

                //评价对话框是否可见
                dialogEvalFormVisible: false,

                //用户已经购买商品对话框是哦夫可见
                dialogMyBoughtVisible: false,

                //用户购买历史对话框
                dialogHistoryBoughtTableVisible: false,

                //订单相关信息对话框是否可见
                dialogDealInfoVisible: false,

                tableData: Array(20).fill(item),

                //路由传递数据
                msg: this.$route.query.data,

                //购买订单时选中商品id
                onClickCommodity: '',

                //做出评价的时候选中的商品id
                onClickEvaluationComID: '',

                //做出评价的时候选中商品对应订单id
                onClickDealID: '',

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
                //渲染table用
                //所有状态为released的商品
                commodities: [{
                    id: "",
                    name: "",
                    describe: "",
                    price: "",
                    releasetime: "",
                    status: ""

                }],

                //订单详细信息
                dealinfo: [{}],

                //用户查询的商品列表，跟用户相关
                user_commodities_list: [{
                    comID: "",
                    comPrice: "",
                    comName: "",
                    comDescribe: "",
                    comReleaseTime: "",
                    comStatus: "",
                    user: ""

                }],

                //用户订单查看列表
                user_deal_list: [{
                    d_location: "",
                    d_time: "",
                    d_tele: "",
                    c_prive: "",
                    c_name: "",
                    c_describe: "",
                    u_name: "",
                    c_status: "",
                    c_id: "",
                    d_id: "",
                    // e_id
                }],

                //用户评价查看表
                user_eval_list: [{
                    e_comment: "",
                    e_starts: null,
                    c_name: "",
                    c_price: "",
                    d_location: "",
                    d_time: "",
                    u_name: "",
                }],

                // user_deal_list: [{

                //     dealID: "",
                //     dealLocation: "",
                //     dealChangeTime: "",
                //     dealBuyerTelephone: "",
                //     commodityEntity: {
                //         comID: "",
                //         comPrice: "",
                //         comName: "",
                //         comDescribe: "",
                //         comReleaseTime: "",
                //         comStatus: traded,
                //         user: {
                //             id: "",
                //             username: "",
                //             password: "",
                //             telephonenum: ""
                //         }
                //     },
                //     userEntity: {
                //         id: "",
                //         username: "",
                //         password: "",
                //         telephonenum: ""
                //     }

                // }],

                //用户点击卖出商品的订单信息
                user_trade_com_info: {
                    // dealID: "",
                    // dealLocation: "",
                    // dealChangeTime: "",
                    // dealBuyerTelephone: "",
                    // commodityEntity: {
                    //     comID: "",
                    //     comPrice: "",
                    //     comName: "",
                    //     comDescribe: "",
                    //     comReleaseTime: "",
                    //     comStatus: "",
                    //     user: {
                    //         id: "",
                    //         username: "",
                    //         password: "",
                    //         telephonenum: ""
                    //     }
                    // },
                    // userEntity: {
                    //     id: "",
                    //     username: "",
                    //     password: "",
                    //     telephonenum: ""
                    // }

                    username: "",
                    dealLocation: "",
                    dealChangeTime: "",
                    dealBuyerTelephone: ""

                },


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
                dealRules: {
                    dealBuyerTelephone: [{
                            required: true,
                            message: '手机号码不能为空'
                        },
                        {
                            type: 'number',
                            message: '手机号码必须为数字值'
                        },


                    ],
                    dealChangeTime: [{
                        // type: 'date',
                        required: true,
                        message: '请选择交易时间',
                        trigger: 'change'
                    }],
                    dealLocation: [{
                            required: true,
                            message: '请约定交易地点',
                            trigger: 'blur'
                        },
                        {
                            min: 1,
                            max: 10,
                            message: '长度在 1 到 10 个字符',
                            trigger: 'blur'
                        }
                    ],

                },

                //评论订单审核规则
                evalRule: {
                    evalComment: [{
                            required: true,
                            message: "请输入正确的评价",
                            trigger: 'blur'
                        },
                        {
                            min: 1,
                            max: 30,
                            message: '长度在 1 到 30 个字符',
                            trigger: 'blur'
                        }
                    ],
                    evalStars: [{
                        required: true,
                        message: "请打分",
                        trigger: 'blur'
                    }]
                },

                //添加商品表单
                commodityForm: {
                    comName: "",
                    comDescribe: '',
                    comPrice: "",
                    comReleaseTime: '',

                },

                evalForm: {
                    evalComment: "",
                    evalStars: "",
                },

                //订单元素表单
                dealForm: {
                    //地点
                    dealLocation: "",
                    //交易时间
                    dealChangeTime: "",
                    //联系人电话
                    dealBuyerTelephone: ""

                },

                // //下订单表单
                // changeCommodityForm: {

                // },

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
            //发送http请求，查找状态为released的商品
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
            buyCommodityDiaOpen(id) {


                this.onClickCommodity = id;
                console.log("选中id信息")
                console.log(this.onClickCommodity)

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

            // //用户查看自己买了什么功能
            view_my_bought() {
                //跨域请求
                axios({
                    //发送http请求
                    method: 'post',
                    url: 'http://localhost:9090/user/getdealbyuser',
                    crossDomain: true,
                    data: JSON.stringify(this.msg),


                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(response => {
                    //数据放入列表
                    this.user_deal_list = response.data
                })
                this.dialogMyBoughtVisible = true
            },

            //用户查看自己已发布商品的功能，打开嵌套表格的对话框
            view_my_commodity() {
                //跨域请求
                axios({
                    //发送http请求
                    method: 'post',
                    url: 'http://localhost:9090/user/getcombyuser',
                    crossDomain: true,
                    data: JSON.stringify(this.msg),


                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(response => {
                    //数据放入列表
                    this.user_commodities_list = response.data
                })
                this.dialogMyCommodityVisible = true;
            },

            //根据商品id返回订单信息
            check_users_com_status(id) {
                var sendData = {}
                sendData.comID = id
                var self = this
                //跨域请求
                axios({
                    //发送http请求
                    method: 'post',
                    url: 'http://localhost:9090/commodity/finddeal',
                    crossDomain: true,
                    data: JSON.stringify(sendData)

                        ,
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(response => {
                    self.user_trade_com_info.dealLocation = response.data.dealLocation
                    self.user_trade_com_info.dealBuyerTelephone = response.data.dealBuyerTelephone
                    self.user_trade_com_info.dealChangeTime = response.data.dealChangeTime
                    self.user_trade_com_info.username = response.data.userEntity.username

                    console.log(this.objToArr(this.user_trade_com_info))
                    //this.dealinfo = this.objToArr(this.user_trade_com_info)
                    this.dealinfo.push(this.user_trade_com_info)
                    self.dialogDealInfoVisible = true

                })
            },

            //购买商品方法
            //传参失效待解决，换了中方法
            buyCommodity(form) {
                //console.log(this.dealForm)
                //console.log(dealform)
                this.$refs[form].validate((valid) => {
                    if (valid) { //验证通过

                        let com = {}
                        com.comID = this.onClickCommodity


                        //此处以后会更改，发送多个json浪费资源，用requestparam代替
                        var sendDeal = JSON.stringify(this.dealForm)
                        var sendUser = JSON.stringify(this.msg)
                        var sendCom = JSON.stringify(com)

                        //跨域请求
                        axios({
                            //发送http请求
                            method: 'post',
                            url: 'http://localhost:9090/deal/makedeal',
                            crossDomain: true,
                            //以map形式发送
                            //以map形式发送数据太浪费资源，以后改成一个商品json在请求体和一个userid在url中
                            data: {
                                "com": sendCom,
                                "user": sendUser,
                                "deal": sendDeal
                            }

                            ,
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then(response => {

                            var length = Object.keys(response.data)
                            if (length == 0) {
                                alert("订单失效")
                            } else {
                                alert("购买成功")
                            }
                        })

                    } else("请注意对话提示框")
                })
            },

            //提交创建

            submitForm(formName) {
                console.log(this.commodityForm)

                //验证通过后发送http请求
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //验证通过
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
                            //以map形式发送数据太浪费资源，以后改成一个商品json在请求体和一个userid在url中
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
                        // location.reload();
                        // this.dialogFormVisible = false

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

            //打开评价对话框
            openEvalDialog(c_id, d_id) {
                alert(d_id)
                this.dialogEvalFormVisible = true
                this.onClickEvaluationComID = c_id
                this.onClickDealID = d_id

            },

            //提交评价
            evaling() {
                var comobj = {}
                comobj.comID = this.onClickEvaluationComID

                var dealobj = {}
                dealobj.dealID = this.onClickDealID
                //alert(this.evalForm.evalStars)
                axios({
                    //发送http请求
                    method: 'post',
                    url: 'http://localhost:9090/eval/makeeval',
                    crossDomain: true,
                    //以map形式发送
                    //以map形式发送数据太浪费资源，以后改成一个商品json在请求体和一个userid在url中
                    data: {
                        "eval": JSON.stringify(this.evalForm),
                        "com": JSON.stringify(comobj),
                        "user": JSON.stringify(this.msg),
                        "deal": JSON.stringify(dealobj)

                    },
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(response => {

                })
            },

            objToArr(obj) {
                var arr = []
                for (let i in obj) {
                    let o = {};
                    o[i] = obj[i];
                    arr.push(o)

                }
                return arr;
            },

            //查看购买记录
            view_my_history_bought() {
                axios({
                    //发送http请求
                    method: 'post',
                    url: 'http://localhost:9090/user/getevalbyuser',
                    crossDomain: true,
                    //以map形式发送
                    //以map形式发送数据太浪费资源，以后改成一个商品json在请求体和一个userid在url中
                    data: JSON.stringify(this.msg),
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(response => {
                    this.user_eval_list = response.data
                })
                this.dialogHistoryBoughtTableVisible = true
            },

            //重置表格
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        filters: {
            //根据商品状态返回信息
            jugementStatus: function (status) {
                if (status == 'released') {
                    return '尚未被购买'
                }
                if (status == 'traded') {
                    return '订单交易中'
                }
            }
        }


    };
</script>