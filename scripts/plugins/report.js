function getEntityList(reportConfigId){

    const [entityCode,id] = reportConfigId.split("-")

    const row = Process("models.sys.entity.find",entityCode, {
        select:["label"],
        withs:{
            fieldSet:{
                query:{
                    select:["code","name","type"]
                }
            }
        }
    });
    if (row == null) {
        throw new Error(`实体 ${entity} 不存在`);
    }
    return [{
        label : row.label,
        fieldList:row.fieldSet
    }]



    // return [
    //     {
    //         "label": "仓库管理",
    //         "fieldList": [
    //             {
    //                 "code": "createdOn",
    //                 "name": "创建时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "createdBy",
    //                 "name": "创建用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "modifiedOn",
    //                 "name": "最近修改时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "modifiedBy",
    //                 "name": "修改用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "ownerUser",
    //                 "name": "所属用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "ownerDepartment",
    //                 "name": "所属部门",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "cangkumingcheng",
    //                 "name": "仓库名称",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "cangkubianma",
    //                 "name": "仓库编码",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "cangkudizhi",
    //                 "name": "仓库地区",
    //                 "type": "AreaSelect"
    //             },
    //             {
    //                 "code": "cangkurongliang",
    //                 "name": "仓库容量/立方",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "cangkuxingzhi",
    //                 "name": "仓库性质",
    //                 "type": "Option"
    //             },
    //             {
    //                 "code": "cangkuzhuangtai",
    //                 "name": "仓库状态",
    //                 "type": "Boolean"
    //             },
    //             {
    //                 "code": "cangkuzhuguan",
    //                 "name": "仓库主管",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "lianxidianhua",
    //                 "name": "联系电话",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "beizhuxinxi",
    //                 "name": "备注信息",
    //                 "type": "TextArea"
    //             },
    //             {
    //                 "code": "jutidizhi",
    //                 "name": "具体地址",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "zongrukushuliang",
    //                 "name": "总入库数量",
    //                 "type": "Integer"
    //             },
    //             {
    //                 "code": "zongchukushuliang",
    //                 "name": "总出库数量",
    //                 "type": "Integer"
    //             },
    //             {
    //                 "code": "dangqiankucunshu",
    //                 "name": "当前库存数",
    //                 "type": "Integer"
    //             },
    //             {
    //                 "code": "kucundongjieshuliang",
    //                 "name": "库存冻结数量",
    //                 "type": "Integer"
    //             },
    //             {
    //                 "code": "dangqiankeyongkucunshuliang",
    //                 "name": "当前可用库存数量",
    //                 "type": "Integer"
    //             }
    //         ]
    //     },
    //     {
    //         "label": "仓位信息",
    //         "fieldList": [
    //             {
    //                 "code": "Cangweixinxi.createdOn",
    //                 "name": "创建时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Cangweixinxi.createdBy",
    //                 "name": "创建用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Cangweixinxi.modifiedOn",
    //                 "name": "最近修改时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Cangweixinxi.modifiedBy",
    //                 "name": "修改用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Cangweixinxi.mdCangkuguanliId",
    //                 "name": "主从关联Id",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Cangweixinxi.cangweixuhao",
    //                 "name": "仓位序号",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "Cangweixinxi.cangweirongliang",
    //                 "name": "仓位容量/立方",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "Cangweixinxi.cangweibeizhu",
    //                 "name": "仓位备注",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "Cangweixinxi.cangweizhuangtai",
    //                 "name": "仓位状态",
    //                 "type": "Option"
    //             }
    //         ]
    //     },
    //     {
    //         "label": "报价单",
    //         "fieldList": [
    //             {
    //                 "code": "Baojiadan.createdOn",
    //                 "name": "创建时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Baojiadan.createdBy",
    //                 "name": "创建用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Baojiadan.modifiedOn",
    //                 "name": "最近修改时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Baojiadan.modifiedBy",
    //                 "name": "修改用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Baojiadan.ownerUser",
    //                 "name": "所属用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Baojiadan.ownerDepartment",
    //                 "name": "所属部门",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Baojiadan.xuanzekehu",
    //                 "name": "选择客户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Baojiadan.chukucangku",
    //                 "name": "出库仓库",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Baojiadan.xiaoshouyuanjiazonge",
    //                 "name": "销售原价总额(含税)/元",
    //                 "type": "Money"
    //             },
    //             {
    //                 "code": "Baojiadan.youhuijine",
    //                 "name": "优惠金额/元",
    //                 "type": "Money"
    //             },
    //             {
    //                 "code": "Baojiadan.zhengdanzhekoulv",
    //                 "name": "整单折扣率%",
    //                 "type": "Percent"
    //             },
    //             {
    //                 "code": "Baojiadan.xiaoshoudingdanjine",
    //                 "name": "销售订单金额(含税)/元",
    //                 "type": "Money"
    //             },
    //             {
    //                 "code": "Baojiadan.baojiamaolilv",
    //                 "name": "报价毛利率%",
    //                 "type": "Percent"
    //             },
    //             {
    //                 "code": "Baojiadan.baojiadanbianhao",
    //                 "name": "报价单编号",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "Baojiadan.baojiariqi",
    //                 "name": "报价日期",
    //                 "type": "Date"
    //             },
    //             {
    //                 "code": "Baojiadan.approvalConfigId",
    //                 "name": "审批流程",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Baojiadan.approvalStatus",
    //                 "name": "审批状态",
    //                 "type": "Status"
    //             },
    //             {
    //                 "code": "Baojiadan.lastApprovedBy",
    //                 "name": "最近审批人",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Baojiadan.lastApprovedOn",
    //                 "name": "最近审批时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Baojiadan.lastApprovalRemark",
    //                 "name": "最近审批批注",
    //                 "type": "TextArea"
    //             },
    //             {
    //                 "code": "Baojiadan.chengbenzongjia",
    //                 "name": "成本总价",
    //                 "type": "Money"
    //             }
    //         ]
    //     },
    //     {
    //         "label": "销售订单",
    //         "fieldList": [
    //             {
    //                 "code": "Xiaoshoudingdan.createdOn",
    //                 "name": "创建时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Xiaoshoudingdan.createdBy",
    //                 "name": "创建用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Xiaoshoudingdan.modifiedOn",
    //                 "name": "最近修改时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Xiaoshoudingdan.modifiedBy",
    //                 "name": "修改用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Xiaoshoudingdan.ownerUser",
    //                 "name": "所属用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Xiaoshoudingdan.ownerDepartment",
    //                 "name": "所属部门",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Xiaoshoudingdan.xuanzekehu",
    //                 "name": "选择客户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Xiaoshoudingdan.dingdanqiandingriqi",
    //                 "name": "订单签订日期",
    //                 "type": "Date"
    //             },
    //             {
    //                 "code": "Xiaoshoudingdan.dingdanjiaofuriqi",
    //                 "name": "订单交付日期",
    //                 "type": "Date"
    //             },
    //             {
    //                 "code": "Xiaoshoudingdan.xiaoshouguishubumen",
    //                 "name": "销售归属部门",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Xiaoshoudingdan.chukucangku",
    //                 "name": "出库仓库",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Xiaoshoudingdan.xiaoshouyuanjiazonge",
    //                 "name": "销售原价总额(含税)/元",
    //                 "type": "Money"
    //             },
    //             {
    //                 "code": "Xiaoshoudingdan.youhuijine",
    //                 "name": "优惠金额/元",
    //                 "type": "Money"
    //             },
    //             {
    //                 "code": "Xiaoshoudingdan.zhengdanzhekoulv",
    //                 "name": "整单折扣率 %",
    //                 "type": "Percent"
    //             },
    //             {
    //                 "code": "Xiaoshoudingdan.xiaoshoudingdanjine",
    //                 "name": "销售订单金额(含税)/元",
    //                 "type": "Money"
    //             },
    //             {
    //                 "code": "Xiaoshoudingdan.dingdanmaolilv",
    //                 "name": "订单毛利率%",
    //                 "type": "Percent"
    //             },
    //             {
    //                 "code": "Xiaoshoudingdan.songhuodiqu",
    //                 "name": "送货地区",
    //                 "type": "AreaSelect"
    //             },
    //             {
    //                 "code": "Xiaoshoudingdan.jutidizhi",
    //                 "name": "具体地址",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "Xiaoshoudingdan.jiesuanqixian",
    //                 "name": "结算期限",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "Xiaoshoudingdan.xiaoshoudingdanmingcheng",
    //                 "name": "销售订单名称",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "Xiaoshoudingdan.chanpinchengbenzongjia",
    //                 "name": "产品成本总价",
    //                 "type": "Money"
    //             }
    //         ]
    //     },
    //     {
    //         "label": "销售出库",
    //         "fieldList": [
    //             {
    //                 "code": "Xiaoshouchuku.createdOn",
    //                 "name": "创建时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Xiaoshouchuku.createdBy",
    //                 "name": "创建用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Xiaoshouchuku.modifiedOn",
    //                 "name": "最近修改时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Xiaoshouchuku.modifiedBy",
    //                 "name": "修改用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Xiaoshouchuku.ownerUser",
    //                 "name": "所属用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Xiaoshouchuku.ownerDepartment",
    //                 "name": "所属部门",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Xiaoshouchuku.xuanzexiaoshoudingdan",
    //                 "name": "选择销售订单",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Xiaoshouchuku.chanpinchukubiaoqian",
    //                 "name": "产品出库标签",
    //                 "type": "Option"
    //             },
    //             {
    //                 "code": "Xiaoshouchuku.chukucangku",
    //                 "name": "出库仓库",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Xiaoshouchuku.chukuchanpinzongshu",
    //                 "name": "出库产品总数",
    //                 "type": "Integer"
    //             },
    //             {
    //                 "code": "Xiaoshouchuku.chukuchanpinshoujiazonge",
    //                 "name": "出库产品售价总额(含税)/元",
    //                 "type": "Money"
    //             },
    //             {
    //                 "code": "Xiaoshouchuku.yujichukushijian",
    //                 "name": "预计出库时间",
    //                 "type": "Date"
    //             },
    //             {
    //                 "code": "Xiaoshouchuku.chukuyuan",
    //                 "name": "出库员",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Xiaoshouchuku.kehushouhuoqueren",
    //                 "name": "客户收货确认",
    //                 "type": "Boolean"
    //             },
    //             {
    //                 "code": "Xiaoshouchuku.shouhuoquerenshijian",
    //                 "name": "收货确认时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Xiaoshouchuku.xiaoshoudingdanmingcheng",
    //                 "name": "销售订单名称",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "Xiaoshouchuku.kehumingcheng",
    //                 "name": "客户名称",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Xiaoshouchuku.approvalConfigId",
    //                 "name": "审批流程",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Xiaoshouchuku.approvalStatus",
    //                 "name": "审批状态",
    //                 "type": "Status"
    //             },
    //             {
    //                 "code": "Xiaoshouchuku.lastApprovedBy",
    //                 "name": "最近审批人",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Xiaoshouchuku.lastApprovedOn",
    //                 "name": "最近审批时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Xiaoshouchuku.lastApprovalRemark",
    //                 "name": "最近审批批注",
    //                 "type": "TextArea"
    //             }
    //         ]
    //     },
    //     {
    //         "label": "出库产品明细",
    //         "fieldList": [
    //             {
    //                 "code": "Chukuchanpinmingxi.createdOn",
    //                 "name": "创建时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Chukuchanpinmingxi.createdBy",
    //                 "name": "创建用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Chukuchanpinmingxi.modifiedOn",
    //                 "name": "最近修改时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Chukuchanpinmingxi.modifiedBy",
    //                 "name": "修改用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Chukuchanpinmingxi.mdXiaoshouchukuId",
    //                 "name": "主从关联Id",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Chukuchanpinmingxi.xuanzechanpin",
    //                 "name": "选择产品",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Chukuchanpinmingxi.bencichukushuliang",
    //                 "name": "本次出库数量",
    //                 "type": "Integer"
    //             },
    //             {
    //                 "code": "Chukuchanpinmingxi.chukucangwei",
    //                 "name": "出库仓位",
    //                 "type": "Reference"
    //             }
    //         ]
    //     },
    //     {
    //         "label": "销售退货",
    //         "fieldList": [
    //             {
    //                 "code": "Xiaoshoutuihuo.createdOn",
    //                 "name": "创建时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Xiaoshoutuihuo.createdBy",
    //                 "name": "创建用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Xiaoshoutuihuo.modifiedOn",
    //                 "name": "最近修改时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Xiaoshoutuihuo.modifiedBy",
    //                 "name": "修改用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Xiaoshoutuihuo.ownerUser",
    //                 "name": "所属用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Xiaoshoutuihuo.ownerDepartment",
    //                 "name": "所属部门",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Xiaoshoutuihuo.xuanzexiaoshoudingdan",
    //                 "name": "选择销售订单",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Xiaoshoutuihuo.kehu",
    //                 "name": "客户名称",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Xiaoshoutuihuo.tuihuoshenqingriqi",
    //                 "name": "退货申请日期",
    //                 "type": "Date"
    //             },
    //             {
    //                 "code": "Xiaoshoutuihuo.xiaoshoutuihuodanbianhao",
    //                 "name": "销售退货单编号",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "Xiaoshoutuihuo.tuihuoyuanyin",
    //                 "name": "退货原因",
    //                 "type": "TextArea"
    //             },
    //             {
    //                 "code": "Xiaoshoutuihuo.tuihuocangku",
    //                 "name": "退货仓库",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Xiaoshoutuihuo.yichukutuihuochanpinzongshu",
    //                 "name": "已出库-退货产品总数",
    //                 "type": "Integer"
    //             },
    //             {
    //                 "code": "Xiaoshoutuihuo.uihuochanpinshoujiazonge",
    //                 "name": "已出库-退货产品售价总额(含税)/元",
    //                 "type": "Money"
    //             },
    //             {
    //                 "code": "Xiaoshoutuihuo.jingbanren",
    //                 "name": "经办人",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Xiaoshoutuihuo.approvalConfigId",
    //                 "name": "审批流程",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Xiaoshoutuihuo.approvalStatus",
    //                 "name": "审批状态",
    //                 "type": "Status"
    //             },
    //             {
    //                 "code": "Xiaoshoutuihuo.lastApprovedBy",
    //                 "name": "最近审批人",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Xiaoshoutuihuo.lastApprovedOn",
    //                 "name": "最近审批时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Xiaoshoutuihuo.lastApprovalRemark",
    //                 "name": "最近审批批注",
    //                 "type": "TextArea"
    //             }
    //         ]
    //     },
    //     {
    //         "label": "采购申请",
    //         "fieldList": [
    //             {
    //                 "code": "Caigoushenqing.createdOn",
    //                 "name": "创建时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Caigoushenqing.createdBy",
    //                 "name": "创建用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigoushenqing.modifiedOn",
    //                 "name": "最近修改时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Caigoushenqing.modifiedBy",
    //                 "name": "修改用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigoushenqing.ownerUser",
    //                 "name": "所属用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigoushenqing.ownerDepartment",
    //                 "name": "所属部门",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigoushenqing.caigoushenqingbianhao",
    //                 "name": "采购申请编号",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "Caigoushenqing.shenqingren",
    //                 "name": "申请人",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigoushenqing.shenqingriqi",
    //                 "name": "申请日期",
    //                 "type": "Date"
    //             },
    //             {
    //                 "code": "Caigoushenqing.daohuoxuqiuriqi",
    //                 "name": "到货需求日期",
    //                 "type": "Date"
    //             },
    //             {
    //                 "code": "Caigoushenqing.xuqiulaiyuan",
    //                 "name": "需求来源",
    //                 "type": "Option"
    //             },
    //             {
    //                 "code": "Caigoushenqing.rukucangku",
    //                 "name": "入库仓库",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigoushenqing.daohuodizhi",
    //                 "name": "到货地址",
    //                 "type": "AreaSelect"
    //             },
    //             {
    //                 "code": "Caigoushenqing.jutidizhi",
    //                 "name": "具体地址",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "Caigoushenqing.caigoujiagezonge",
    //                 "name": "采购价格总额(含税)/元",
    //                 "type": "Money"
    //             },
    //             {
    //                 "code": "Caigoushenqing.beizhu",
    //                 "name": "备注",
    //                 "type": "TextArea"
    //             },
    //             {
    //                 "code": "Caigoushenqing.approvalConfigId",
    //                 "name": "审批流程",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigoushenqing.approvalStatus",
    //                 "name": "审批状态",
    //                 "type": "Status"
    //             },
    //             {
    //                 "code": "Caigoushenqing.lastApprovedBy",
    //                 "name": "最近审批人",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigoushenqing.lastApprovedOn",
    //                 "name": "最近审批时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Caigoushenqing.lastApprovalRemark",
    //                 "name": "最近审批批注",
    //                 "type": "TextArea"
    //             }
    //         ]
    //     },
    //     {
    //         "label": "采购订单",
    //         "fieldList": [
    //             {
    //                 "code": "Caigoudingdan.createdOn",
    //                 "name": "创建时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Caigoudingdan.createdBy",
    //                 "name": "创建用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigoudingdan.modifiedOn",
    //                 "name": "最近修改时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Caigoudingdan.modifiedBy",
    //                 "name": "修改用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigoudingdan.ownerUser",
    //                 "name": "所属用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigoudingdan.ownerDepartment",
    //                 "name": "所属部门",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigoudingdan.caigoudingdan",
    //                 "name": "选择供应商",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigoudingdan.dingdanqiandingriqi",
    //                 "name": "订单签订日期",
    //                 "type": "Date"
    //             },
    //             {
    //                 "code": "Caigoudingdan.caigoudingdanmingcheng",
    //                 "name": "采购订单名称",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "Caigoudingdan.dingdanjiaofuriqi",
    //                 "name": "订单交付日期",
    //                 "type": "Date"
    //             },
    //             {
    //                 "code": "Caigoudingdan.caigoufuzeren",
    //                 "name": "采购负责人",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigoudingdan.rukucangku",
    //                 "name": "入库仓库",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigoudingdan.caigouyuanjiazonge",
    //                 "name": "采购原价总额(含税)/元",
    //                 "type": "Money"
    //             },
    //             {
    //                 "code": "Caigoudingdan.youhuijine",
    //                 "name": "优惠金额",
    //                 "type": "Money"
    //             },
    //             {
    //                 "code": "Caigoudingdan.zhengdanzhekoul",
    //                 "name": "整单折扣率",
    //                 "type": "Percent"
    //             },
    //             {
    //                 "code": "Caigoudingdan.caigoudingdanjine",
    //                 "name": "采购订单金额(含税)/元",
    //                 "type": "Money"
    //             },
    //             {
    //                 "code": "Caigoudingdan.caigoujineheji",
    //                 "name": "采购金额合计(不含税)/元",
    //                 "type": "Money"
    //             },
    //             {
    //                 "code": "Caigoudingdan.daohuodizhi",
    //                 "name": "到货地址",
    //                 "type": "AreaSelect"
    //             },
    //             {
    //                 "code": "Caigoudingdan.jutidizhi",
    //                 "name": "具体地址",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "Caigoudingdan.jiesuanqixian",
    //                 "name": "结算期限",
    //                 "type": "Text"
    //             }
    //         ]
    //     },
    //     {
    //         "label": "采购入库",
    //         "fieldList": [
    //             {
    //                 "code": "Caigouruku.createdOn",
    //                 "name": "创建时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Caigouruku.createdBy",
    //                 "name": "创建用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigouruku.modifiedOn",
    //                 "name": "最近修改时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Caigouruku.modifiedBy",
    //                 "name": "修改用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigouruku.ownerUser",
    //                 "name": "所属用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigouruku.ownerDepartment",
    //                 "name": "所属部门",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigouruku.xuanzecaigoudingdan",
    //                 "name": "选择采购订单",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigouruku.caigourukudanbianhao",
    //                 "name": "采购入库单编号",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "Caigouruku.rukucangku",
    //                 "name": "入库仓库",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigouruku.rukuchanpinzongshu",
    //                 "name": "入库产品总数",
    //                 "type": "Integer"
    //             },
    //             {
    //                 "code": "Caigouruku.rukuchanpincaigoujiazonge",
    //                 "name": "入库产品采购价总额(含税)/元",
    //                 "type": "Money"
    //             },
    //             {
    //                 "code": "Caigouruku.shifoucunzaibuhegepin",
    //                 "name": "是否存在不合格品",
    //                 "type": "Option"
    //             },
    //             {
    //                 "code": "Caigouruku.zhijianshijian",
    //                 "name": "质检时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Caigouruku.zhijianyuan",
    //                 "name": "质检员",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigouruku.hegepinrukuqueren",
    //                 "name": "合格品入库确认",
    //                 "type": "Boolean"
    //             },
    //             {
    //                 "code": "Caigouruku.rukushijian",
    //                 "name": "入库时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Caigouruku.rukuyuan",
    //                 "name": "入库员",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigouruku.approvalConfigId",
    //                 "name": "审批流程",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigouruku.approvalStatus",
    //                 "name": "审批状态",
    //                 "type": "Status"
    //             },
    //             {
    //                 "code": "Caigouruku.lastApprovedBy",
    //                 "name": "最近审批人",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigouruku.lastApprovedOn",
    //                 "name": "最近审批时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Caigouruku.lastApprovalRemark",
    //                 "name": "最近审批批注",
    //                 "type": "TextArea"
    //             }
    //         ]
    //     },
    //     {
    //         "label": "入库产品明细",
    //         "fieldList": [
    //             {
    //                 "code": "Rukuchanpinmingxi.createdOn",
    //                 "name": "创建时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Rukuchanpinmingxi.createdBy",
    //                 "name": "创建用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Rukuchanpinmingxi.modifiedOn",
    //                 "name": "最近修改时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Rukuchanpinmingxi.modifiedBy",
    //                 "name": "修改用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Rukuchanpinmingxi.mdCaigourukuId",
    //                 "name": "主从关联Id",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Rukuchanpinmingxi.xuanzechanpin",
    //                 "name": "选择产品",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Rukuchanpinmingxi.bencidaohuoshuliang",
    //                 "name": "本次到货数量",
    //                 "type": "Integer"
    //             },
    //             {
    //                 "code": "Rukuchanpinmingxi.buhegeshuliang",
    //                 "name": "不合格数量",
    //                 "type": "Integer"
    //             },
    //             {
    //                 "code": "Rukuchanpinmingxi.bencirukushuliang",
    //                 "name": "本次入库数量",
    //                 "type": "Integer"
    //             },
    //             {
    //                 "code": "Rukuchanpinmingxi.rukucangwei",
    //                 "name": "入库仓位",
    //                 "type": "Reference"
    //             }
    //         ]
    //     },
    //     {
    //         "label": "采购退货",
    //         "fieldList": [
    //             {
    //                 "code": "Caigoutuihuo.createdOn",
    //                 "name": "创建时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Caigoutuihuo.createdBy",
    //                 "name": "创建用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigoutuihuo.modifiedOn",
    //                 "name": "最近修改时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Caigoutuihuo.modifiedBy",
    //                 "name": "修改用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigoutuihuo.ownerUser",
    //                 "name": "所属用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigoutuihuo.ownerDepartment",
    //                 "name": "所属部门",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigoutuihuo.kehu",
    //                 "name": "客户名称",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigoutuihuo.tuihuoshenqingriqi",
    //                 "name": "退货申请日期",
    //                 "type": "Date"
    //             },
    //             {
    //                 "code": "Caigoutuihuo.xiaoshoutuihuodanbianhao",
    //                 "name": "采购退货单编号",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "Caigoutuihuo.tuihuoyuanyin",
    //                 "name": "退货原因",
    //                 "type": "TextArea"
    //             },
    //             {
    //                 "code": "Caigoutuihuo.tuihuocangku",
    //                 "name": "退货仓库",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigoutuihuo.yichukutuihuochanpinzongshu",
    //                 "name": "已入库-退货产品总数",
    //                 "type": "Integer"
    //             },
    //             {
    //                 "code": "Caigoutuihuo.uihuochanpinshoujiazonge",
    //                 "name": "已入库-退货产品售价总额(含税)/元",
    //                 "type": "Money"
    //             },
    //             {
    //                 "code": "Caigoutuihuo.jingbanren",
    //                 "name": "经办人",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigoutuihuo.xuanzecaigoudingdan",
    //                 "name": "选择采购订单",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigoutuihuo.tuihuochanpinzongshu",
    //                 "name": "退货产品总数",
    //                 "type": "Integer"
    //             },
    //             {
    //                 "code": "Caigoutuihuo.tuihuochanpincaigoujiazonge",
    //                 "name": "退货产品采购价总额(含税)/元",
    //                 "type": "Money"
    //             },
    //             {
    //                 "code": "Caigoutuihuo.chanpintuihuiqueren",
    //                 "name": "产品退回确认",
    //                 "type": "Boolean"
    //             },
    //             {
    //                 "code": "Caigoutuihuo.tuihuochulishijian",
    //                 "name": "退货处理时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Caigoutuihuo.approvalConfigId",
    //                 "name": "审批流程",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigoutuihuo.approvalStatus",
    //                 "name": "审批状态",
    //                 "type": "Status"
    //             },
    //             {
    //                 "code": "Caigoutuihuo.lastApprovedBy",
    //                 "name": "最近审批人",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Caigoutuihuo.lastApprovedOn",
    //                 "name": "最近审批时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Caigoutuihuo.lastApprovalRemark",
    //                 "name": "最近审批批注",
    //                 "type": "TextArea"
    //             }
    //         ]
    //     },
    //     {
    //         "label": "其他入库单",
    //         "fieldList": [
    //             {
    //                 "code": "Qitarukudan.createdOn",
    //                 "name": "创建时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Qitarukudan.createdBy",
    //                 "name": "创建用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Qitarukudan.modifiedOn",
    //                 "name": "最近修改时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Qitarukudan.modifiedBy",
    //                 "name": "修改用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Qitarukudan.ownerUser",
    //                 "name": "所属用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Qitarukudan.ownerDepartment",
    //                 "name": "所属部门",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Qitarukudan.rukuleixing",
    //                 "name": "入库类型",
    //                 "type": "Option"
    //             },
    //             {
    //                 "code": "Qitarukudan.rukucangku",
    //                 "name": "入库仓库",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Qitarukudan.qitarukudanbianhao",
    //                 "name": "其他入库单编号",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "Qitarukudan.rukuchanpinzongshu",
    //                 "name": "入库产品总数",
    //                 "type": "Integer"
    //             },
    //             {
    //                 "code": "Qitarukudan.rukuchanpinshoujiazonge",
    //                 "name": "入库产品售价总额(含税)/元",
    //                 "type": "Money"
    //             },
    //             {
    //                 "code": "Qitarukudan.rukuchanpinchengbenzonge",
    //                 "name": "入库产品成本总额/元",
    //                 "type": "Money"
    //             },
    //             {
    //                 "code": "Qitarukudan.rukuqueren",
    //                 "name": "入库确认",
    //                 "type": "Boolean"
    //             },
    //             {
    //                 "code": "Qitarukudan.rukushijian",
    //                 "name": "入库时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Qitarukudan.rukuyuan",
    //                 "name": "入库员",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Qitarukudan.approvalConfigId",
    //                 "name": "审批流程",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Qitarukudan.approvalStatus",
    //                 "name": "审批状态",
    //                 "type": "Status"
    //             },
    //             {
    //                 "code": "Qitarukudan.lastApprovedBy",
    //                 "name": "最近审批人",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Qitarukudan.lastApprovedOn",
    //                 "name": "最近审批时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Qitarukudan.lastApprovalRemark",
    //                 "name": "最近审批批注",
    //                 "type": "TextArea"
    //             }
    //         ]
    //     },
    //     {
    //         "label": "其他入库产品明细",
    //         "fieldList": [
    //             {
    //                 "code": "Qitarukuchanpinmingxi.createdOn",
    //                 "name": "创建时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Qitarukuchanpinmingxi.createdBy",
    //                 "name": "创建用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Qitarukuchanpinmingxi.modifiedOn",
    //                 "name": "最近修改时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Qitarukuchanpinmingxi.modifiedBy",
    //                 "name": "修改用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Qitarukuchanpinmingxi.mdQitarukudanId",
    //                 "name": "主从关联Id",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Qitarukuchanpinmingxi.xuanzechanpin",
    //                 "name": "选择产品",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Qitarukuchanpinmingxi.bencirukushuliang",
    //                 "name": "本次入库数量",
    //                 "type": "Integer"
    //             },
    //             {
    //                 "code": "Qitarukuchanpinmingxi.rukucangwei",
    //                 "name": "入库仓位",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Qitarukuchanpinmingxi.xiaoshoudanjia",
    //                 "name": "销售单价(含税)/元",
    //                 "type": "Money"
    //             },
    //             {
    //                 "code": "Qitarukuchanpinmingxi.chengbendanjia",
    //                 "name": "成本单价",
    //                 "type": "Money"
    //             },
    //             {
    //                 "code": "Qitarukuchanpinmingxi.chanpinshoujiaheji",
    //                 "name": "产品售价合计(含税)/元",
    //                 "type": "Money"
    //             },
    //             {
    //                 "code": "Qitarukuchanpinmingxi.chanpinchengbenheji",
    //                 "name": "产品成本合计/元",
    //                 "type": "Money"
    //             }
    //         ]
    //     },
    //     {
    //         "label": "其他出库单",
    //         "fieldList": [
    //             {
    //                 "code": "Qitachukudan.createdOn",
    //                 "name": "创建时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Qitachukudan.createdBy",
    //                 "name": "创建用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Qitachukudan.modifiedOn",
    //                 "name": "最近修改时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Qitachukudan.modifiedBy",
    //                 "name": "修改用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Qitachukudan.ownerUser",
    //                 "name": "所属用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Qitachukudan.ownerDepartment",
    //                 "name": "所属部门",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Qitachukudan.rukuleixing",
    //                 "name": "出库类型",
    //                 "type": "Option"
    //             },
    //             {
    //                 "code": "Qitachukudan.rukucangku",
    //                 "name": "出库仓库",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Qitachukudan.qitarukudanbianhao",
    //                 "name": "其他出库单编号",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "Qitachukudan.rukuchanpinzongshu",
    //                 "name": "出库产品总数",
    //                 "type": "Integer"
    //             },
    //             {
    //                 "code": "Qitachukudan.rukuchanpinshoujiazonge",
    //                 "name": "出库产品售价总额(含税)/元",
    //                 "type": "Money"
    //             },
    //             {
    //                 "code": "Qitachukudan.rukuchanpinchengbenzonge",
    //                 "name": "出库产品成本总额/元",
    //                 "type": "Money"
    //             },
    //             {
    //                 "code": "Qitachukudan.rukuqueren",
    //                 "name": "出库确认",
    //                 "type": "Boolean"
    //             },
    //             {
    //                 "code": "Qitachukudan.rukushijian",
    //                 "name": "出库时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Qitachukudan.rukuyuan",
    //                 "name": "出库员",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Qitachukudan.approvalConfigId",
    //                 "name": "审批流程",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Qitachukudan.approvalStatus",
    //                 "name": "审批状态",
    //                 "type": "Status"
    //             },
    //             {
    //                 "code": "Qitachukudan.lastApprovedBy",
    //                 "name": "最近审批人",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Qitachukudan.lastApprovedOn",
    //                 "name": "最近审批时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Qitachukudan.lastApprovalRemark",
    //                 "name": "最近审批批注",
    //                 "type": "TextArea"
    //             }
    //         ]
    //     },
    //     {
    //         "label": "其他出库产品明细",
    //         "fieldList": [
    //             {
    //                 "code": "Qitachukuchanpinmingxi.createdOn",
    //                 "name": "创建时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Qitachukuchanpinmingxi.createdBy",
    //                 "name": "创建用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Qitachukuchanpinmingxi.modifiedOn",
    //                 "name": "最近修改时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Qitachukuchanpinmingxi.modifiedBy",
    //                 "name": "修改用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Qitachukuchanpinmingxi.mdQitachukudanId",
    //                 "name": "主从关联Id",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Qitachukuchanpinmingxi.xuanzechanpin",
    //                 "name": "选择产品",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Qitachukuchanpinmingxi.bencirukushuliang",
    //                 "name": "本次出库数量",
    //                 "type": "Integer"
    //             },
    //             {
    //                 "code": "Qitachukuchanpinmingxi.rukucangwei",
    //                 "name": "出库仓位",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Qitachukuchanpinmingxi.xiaoshoudanjia",
    //                 "name": "销售单价(含税)/元",
    //                 "type": "Money"
    //             },
    //             {
    //                 "code": "Qitachukuchanpinmingxi.chengbendanjia",
    //                 "name": "成本单价",
    //                 "type": "Money"
    //             },
    //             {
    //                 "code": "Qitachukuchanpinmingxi.chanpinshoujiaheji",
    //                 "name": "产品售价合计(含税)/元",
    //                 "type": "Money"
    //             },
    //             {
    //                 "code": "Qitachukuchanpinmingxi.chanpinchengbenheji",
    //                 "name": "产品成本合计/元",
    //                 "type": "Money"
    //             }
    //         ]
    //     },
    //     {
    //         "label": "库存调拨",
    //         "fieldList": [
    //             {
    //                 "code": "Kucuntiaobo.createdOn",
    //                 "name": "创建时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Kucuntiaobo.createdBy",
    //                 "name": "创建用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Kucuntiaobo.modifiedOn",
    //                 "name": "最近修改时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Kucuntiaobo.modifiedBy",
    //                 "name": "修改用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Kucuntiaobo.ownerUser",
    //                 "name": "所属用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Kucuntiaobo.ownerDepartment",
    //                 "name": "所属部门",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Kucuntiaobo.tiaoboleixing",
    //                 "name": "调拨类型",
    //                 "type": "Option"
    //             },
    //             {
    //                 "code": "Kucuntiaobo.tiaoboshenqingriqi",
    //                 "name": "调拨申请日期",
    //                 "type": "Date"
    //             },
    //             {
    //                 "code": "Kucuntiaobo.qiwangdaohuoriqi",
    //                 "name": "期望到货日期",
    //                 "type": "Date"
    //             },
    //             {
    //                 "code": "Kucuntiaobo.shenqingren",
    //                 "name": "申请人",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Kucuntiaobo.tiaobodanbianhao",
    //                 "name": "调拨单编号",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "Kucuntiaobo.tiaochucangku",
    //                 "name": "调出仓库",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Kucuntiaobo.tiaorucangku",
    //                 "name": "调入仓库",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Kucuntiaobo.tiaobochanpinzongshu",
    //                 "name": "调拨产品总数",
    //                 "type": "Integer"
    //             },
    //             {
    //                 "code": "Kucuntiaobo.tiaobochanpinshoujiazonge",
    //                 "name": "调拨产品售价总额(含税)/元",
    //                 "type": "Money"
    //             },
    //             {
    //                 "code": "Kucuntiaobo.tiaobochanpinchengbenzonge",
    //                 "name": "调拨产品成本总额/元",
    //                 "type": "Money"
    //             }
    //         ]
    //     },
    //     {
    //         "label": "库存盘点",
    //         "fieldList": [
    //             {
    //                 "code": "Kucunpandian.createdOn",
    //                 "name": "创建时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Kucunpandian.createdBy",
    //                 "name": "创建用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Kucunpandian.modifiedOn",
    //                 "name": "最近修改时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Kucunpandian.modifiedBy",
    //                 "name": "修改用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Kucunpandian.ownerUser",
    //                 "name": "所属用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Kucunpandian.ownerDepartment",
    //                 "name": "所属部门",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Kucunpandian.pandianleixing",
    //                 "name": "盘点类型",
    //                 "type": "Option"
    //             },
    //             {
    //                 "code": "Kucunpandian.pandiandanbianhao",
    //                 "name": "盘点单编号",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "Kucunpandian.pandiankaishiriqi",
    //                 "name": "盘点开始日期",
    //                 "type": "Date"
    //             },
    //             {
    //                 "code": "Kucunpandian.pandianjieshuriqi",
    //                 "name": "盘点结束日期",
    //                 "type": "Date"
    //             },
    //             {
    //                 "code": "Kucunpandian.pandianyuan",
    //                 "name": "盘点员",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Kucunpandian.pandiancangku",
    //                 "name": "盘点仓库",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Kucunpandian.pankuichanpinzongshu",
    //                 "name": "盘亏产品总数",
    //                 "type": "Integer"
    //             },
    //             {
    //                 "code": "Kucunpandian.pankuichanpinshoujiazonge",
    //                 "name": "盘亏产品售价总额(含税)/元",
    //                 "type": "Money"
    //             },
    //             {
    //                 "code": "Kucunpandian.panyingchanpinzongshu",
    //                 "name": "盘盈产品总数",
    //                 "type": "Integer"
    //             },
    //             {
    //                 "code": "Kucunpandian.panyingchanpinshoujiazonge",
    //                 "name": "盘盈产品售价总额(含税)/元",
    //                 "type": "Money"
    //             },
    //             {
    //                 "code": "Kucunpandian.approvalConfigId",
    //                 "name": "审批流程",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Kucunpandian.approvalStatus",
    //                 "name": "审批状态",
    //                 "type": "Status"
    //             },
    //             {
    //                 "code": "Kucunpandian.lastApprovedBy",
    //                 "name": "最近审批人",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Kucunpandian.lastApprovedOn",
    //                 "name": "最近审批时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Kucunpandian.lastApprovalRemark",
    //                 "name": "最近审批批注",
    //                 "type": "TextArea"
    //             }
    //         ]
    //     },
    //     {
    //         "label": "WMS退料入库",
    //         "fieldList": [
    //             {
    //                 "code": "WMStuiliaoruku.createdOn",
    //                 "name": "创建时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "WMStuiliaoruku.createdBy",
    //                 "name": "创建用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "WMStuiliaoruku.modifiedOn",
    //                 "name": "最近修改时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "WMStuiliaoruku.modifiedBy",
    //                 "name": "修改用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "WMStuiliaoruku.ownerUser",
    //                 "name": "所属用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "WMStuiliaoruku.ownerDepartment",
    //                 "name": "所属部门",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "WMStuiliaoruku.xuanzelingliaochukudan",
    //                 "name": "选择领料出库单",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "WMStuiliaoruku.chejiantuiliaoshijian",
    //                 "name": "车间退料时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "WMStuiliaoruku.chejiantuiliaobianhao",
    //                 "name": "车间退料编号",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "WMStuiliaoruku.tuiliaoyuanyin",
    //                 "name": "退料原因",
    //                 "type": "Option"
    //             },
    //             {
    //                 "code": "WMStuiliaoruku.tuiliaocangku",
    //                 "name": "退料仓库",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "WMStuiliaoruku.tuiliaohuopinzongshu",
    //                 "name": "退料货品总数",
    //                 "type": "Integer"
    //             },
    //             {
    //                 "code": "WMStuiliaoruku.tuiliaochanpinchengbenzo",
    //                 "name": "退料产品成本总额/元",
    //                 "type": "Money"
    //             },
    //             {
    //                 "code": "WMStuiliaoruku.jingbanren",
    //                 "name": "经办人",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "WMStuiliaoruku.jingbanrenguishubumen",
    //                 "name": "经办人归属部门",
    //                 "type": "Reference"
    //             }
    //         ]
    //     },
    //     {
    //         "label": "WMS入库产品信息",
    //         "fieldList": [
    //             {
    //                 "code": "WMSrukuchanpinxinxi.createdOn",
    //                 "name": "创建时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "WMSrukuchanpinxinxi.createdBy",
    //                 "name": "创建用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "WMSrukuchanpinxinxi.modifiedOn",
    //                 "name": "最近修改时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "WMSrukuchanpinxinxi.modifiedBy",
    //                 "name": "修改用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "WMSrukuchanpinxinxi.mdWMSqitarukudanId",
    //                 "name": "主从关联Id",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "WMSrukuchanpinxinxi.bencirukushuliang",
    //                 "name": "本次入库数量",
    //                 "type": "Integer"
    //             },
    //             {
    //                 "code": "WMSrukuchanpinxinxi.rukucangwei",
    //                 "name": "入库仓位",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "WMSrukuchanpinxinxi.chengbendanjia",
    //                 "name": "成本单价/元",
    //                 "type": "Money"
    //             },
    //             {
    //                 "code": "WMSrukuchanpinxinxi.xuanzechanpin",
    //                 "name": "选择产品",
    //                 "type": "Reference"
    //             }
    //         ]
    //     },
    //     {
    //         "label": "WMS其他出库单",
    //         "fieldList": [
    //             {
    //                 "code": "WMSqitachukudan.createdOn",
    //                 "name": "创建时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "WMSqitachukudan.createdBy",
    //                 "name": "创建用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "WMSqitachukudan.modifiedOn",
    //                 "name": "最近修改时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "WMSqitachukudan.modifiedBy",
    //                 "name": "修改用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "WMSqitachukudan.ownerUser",
    //                 "name": "所属用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "WMSqitachukudan.ownerDepartment",
    //                 "name": "所属部门",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "WMSqitachukudan.chukuleixing",
    //                 "name": "出库类型",
    //                 "type": "Option"
    //             },
    //             {
    //                 "code": "WMSqitachukudan.chukucangku",
    //                 "name": "出库仓库",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "WMSqitachukudan.qitachukudanbianhao",
    //                 "name": "其他出库单编号",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "WMSqitachukudan.shouhuodizhi",
    //                 "name": "收货地址",
    //                 "type": "AreaSelect"
    //             },
    //             {
    //                 "code": "WMSqitachukudan.xiangxidizhi",
    //                 "name": "详细地址",
    //                 "type": "TextArea"
    //             },
    //             {
    //                 "code": "WMSqitachukudan.chukuchanpinzongshu",
    //                 "name": "出库产品总数",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "WMSqitachukudan.chukuchanpinchengbenzon",
    //                 "name": "出库产品成本总额/元",
    //                 "type": "Money"
    //             },
    //             {
    //                 "code": "WMSqitachukudan.chukuqueren",
    //                 "name": "出库确认",
    //                 "type": "Option"
    //             },
    //             {
    //                 "code": "WMSqitachukudan.chukushijian",
    //                 "name": "出库时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "WMSqitachukudan.chukuyuan",
    //                 "name": "出库员",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "WMSqitachukudan.kuguanguishubumen",
    //                 "name": "库管归属部门",
    //                 "type": "Reference"
    //             }
    //         ]
    //     },
    //     {
    //         "label": "WMS库存调拨",
    //         "fieldList": [
    //             {
    //                 "code": "WMSkucuntiaobo.createdOn",
    //                 "name": "创建时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "WMSkucuntiaobo.createdBy",
    //                 "name": "创建用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "WMSkucuntiaobo.modifiedOn",
    //                 "name": "最近修改时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "WMSkucuntiaobo.modifiedBy",
    //                 "name": "修改用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "WMSkucuntiaobo.ownerUser",
    //                 "name": "所属用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "WMSkucuntiaobo.ownerDepartment",
    //                 "name": "所属部门",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "WMSkucuntiaobo.tiaoboleixing",
    //                 "name": "调拨类型",
    //                 "type": "Option"
    //             },
    //             {
    //                 "code": "WMSkucuntiaobo.tiaoboshenqingriqi",
    //                 "name": "调拨申请日期",
    //                 "type": "Date"
    //             },
    //             {
    //                 "code": "WMSkucuntiaobo.qiwangdaohuoriqi",
    //                 "name": "期望到货日期",
    //                 "type": "Date"
    //             },
    //             {
    //                 "code": "WMSkucuntiaobo.shenqingren",
    //                 "name": "申请人",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "WMSkucuntiaobo.shenqingrenguishubumen",
    //                 "name": "申请人归属部门",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "WMSkucuntiaobo.tiaobodanbianhao",
    //                 "name": "调拨单编号",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "WMSkucuntiaobo.tiaochucangku",
    //                 "name": "调出仓库",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "WMSkucuntiaobo.tiaorucangku",
    //                 "name": "调入仓库",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "WMSkucuntiaobo.tiaobochanpinzongshu",
    //                 "name": "调拨产品总数",
    //                 "type": "Integer"
    //             },
    //             {
    //                 "code": "WMSkucuntiaobo.tiaobochanpinchengbenzonn",
    //                 "name": "调拨产品成本总额/元",
    //                 "type": "Money"
    //             }
    //         ]
    //     },
    //     {
    //         "label": "生产计划",
    //         "fieldList": [
    //             {
    //                 "code": "Shengchanjihua.createdOn",
    //                 "name": "创建时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Shengchanjihua.createdBy",
    //                 "name": "创建用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Shengchanjihua.modifiedOn",
    //                 "name": "最近修改时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Shengchanjihua.modifiedBy",
    //                 "name": "修改用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Shengchanjihua.ownerUser",
    //                 "name": "所属用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Shengchanjihua.ownerDepartment",
    //                 "name": "所属部门",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Shengchanjihua.xuanzexiaoshoudingdan",
    //                 "name": "选择销售订单",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Shengchanjihua.xiaoshoudingdanmingcheng",
    //                 "name": "销售订单名称",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "Shengchanjihua.xiaoshoudingdanbianhao",
    //                 "name": "销售订单编号",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "Shengchanjihua.kehumingcheng",
    //                 "name": "客户名称",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Shengchanjihua.shengchanjihuamingcheng",
    //                 "name": "生产计划名称",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "Shengchanjihua.jihuakaishiriqi",
    //                 "name": "计划开始日期",
    //                 "type": "Date"
    //             },
    //             {
    //                 "code": "Shengchanjihua.jihuawangongriqi",
    //                 "name": "计划完工日期",
    //                 "type": "Date"
    //             },
    //             {
    //                 "code": "Shengchanjihua.lingliaocangku",
    //                 "name": "领料仓库",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Shengchanjihua.shengchanjihuabianhao",
    //                 "name": "生产计划编号",
    //                 "type": "Text"
    //             }
    //         ]
    //     },
    //     {
    //         "label": "生产领料",
    //         "fieldList": [
    //             {
    //                 "code": "Shengchanlingliao.createdOn",
    //                 "name": "创建时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Shengchanlingliao.createdBy",
    //                 "name": "创建用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Shengchanlingliao.modifiedOn",
    //                 "name": "最近修改时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Shengchanlingliao.modifiedBy",
    //                 "name": "修改用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Shengchanlingliao.ownerUser",
    //                 "name": "所属用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Shengchanlingliao.ownerDepartment",
    //                 "name": "所属部门",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Shengchanlingliao.shengchangongdan",
    //                 "name": "生产工单",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Shengchanlingliao.shengchangongdanmingcheng",
    //                 "name": "生产工单名称",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "Shengchanlingliao.chukucangku",
    //                 "name": "出库仓库",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Shengchanlingliao.chukuchanpinzongshu",
    //                 "name": "出库产品总数",
    //                 "type": "Integer"
    //             },
    //             {
    //                 "code": "Shengchanlingliao.chanpinchukuqueren",
    //                 "name": "产品出库确认",
    //                 "type": "Boolean"
    //             },
    //             {
    //                 "code": "Shengchanlingliao.lingliaochukushijian",
    //                 "name": "领料出库时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Shengchanlingliao.chukuyuan",
    //                 "name": "出库员",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Shengchanlingliao.lingliaochukudanbianhao",
    //                 "name": "领料出库单编号",
    //                 "type": "Text"
    //             }
    //         ]
    //     },
    //     {
    //         "label": "生产退料",
    //         "fieldList": [
    //             {
    //                 "code": "Shengchantuiliao.createdOn",
    //                 "name": "创建时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Shengchantuiliao.createdBy",
    //                 "name": "创建用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Shengchantuiliao.modifiedOn",
    //                 "name": "最近修改时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Shengchantuiliao.modifiedBy",
    //                 "name": "修改用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Shengchantuiliao.ownerUser",
    //                 "name": "所属用户",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Shengchantuiliao.ownerDepartment",
    //                 "name": "所属部门",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Shengchantuiliao.shengchanlingliaodan",
    //                 "name": "生产领料单",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Shengchantuiliao.shengchangongdanmingcheng",
    //                 "name": "生产工单名称",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "Shengchantuiliao.tuiliaorukudanbianhao",
    //                 "name": "退料入库单编号",
    //                 "type": "Text"
    //             },
    //             {
    //                 "code": "Shengchantuiliao.rukucangku",
    //                 "name": "入库仓库",
    //                 "type": "Reference"
    //             },
    //             {
    //                 "code": "Shengchantuiliao.tuiliaoyuanyin",
    //                 "name": "退料原因",
    //                 "type": "Option"
    //             },
    //             {
    //                 "code": "Shengchantuiliao.rukuchanpinzongshu",
    //                 "name": "入库产品总数",
    //                 "type": "Integer"
    //             },
    //             {
    //                 "code": "Shengchantuiliao.chanpinrukuqueren",
    //                 "name": "产品入库确认",
    //                 "type": "Boolean"
    //             },
    //             {
    //                 "code": "Shengchantuiliao.tuiliaorukushijian",
    //                 "name": "退料入库时间",
    //                 "type": "DateTime"
    //             },
    //             {
    //                 "code": "Shengchantuiliao.rukuyuan",
    //                 "name": "入库员",
    //                 "type": "Reference"
    //             }
    //         ]
    //     }
    // ]
}
function getEntityCode(){

}