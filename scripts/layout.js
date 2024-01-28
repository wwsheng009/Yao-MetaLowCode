const { loadEntityToYao } = Require("sys.yao");
const { getEntityByName } = Require("sys.lib");

// 获取导航配置
function getNavigationList() {

  loadEntityToYao("LayoutConfig");
  const [topNav] = Process("models.layoutconfig.get", {
    select: ["configName", "layoutConfigId", "shareTo", "config"],
    wheres: [
      {
        column: "applyType",
        value: "TOP_NAV",
      },
    ],
  });

  const navList = Process("models.layoutconfig.get", {
    select: ["configName", "layoutConfigId", "shareTo", "config"],
    wheres: [
      {
        column: "applyType",
        value: "NAV",
      },
    ],
  });

  let navigationList = navList;
  // if (topNav?.config) {
  //   let config = JSON.parse(topNav.config);
  //   config.navList.forEach((nav) => {
  //     let idstr = nav.layoutConfigId + "";
  //     if (idstr.includes("-")) {
  //       const [entityCode, id] = idstr.split("-");
  //       idstr = id;
  //     }
  //     idstr = parseInt(idstr);
  //     try {
  //       const layoutConfig = Process("models.layoutconfig.find", idstr, {
  //         select: ["configName", "layoutConfigId", "shareTo", "config"],
  //       });
  //       if (layoutConfig) {
  //         navigationList.push(layoutConfig);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });
  // }
  // 注意，菜单的菜单有权限的控制，需要在getRightMap()增加实体的权限控制。
  return {
    // 这个地址需要增加session后才能实现。
    // chosenNavigationId: "",
    topNavigation: { ...topNav, shareTo: "ALL" },
    navigationList,
  };

  // return {
  //   chosenNavigationId: "0000015-e59c4f1910024a68ba545440e9a5971a",
  //   topNavigation: {
  //     configName: null,
  //     layoutConfigId: "0000015-918c73e0f6b44ae9a18841c76bfd39ea",
  //     shareTo: "ALL",
  //     config:
  //       '{"navList":[{"configName":"进销存标准版","type":1,"layoutConfigId":"0000015-79422574b2ce4a159252c608e9c883e4","outLink":"","guid":"8fe00a25d6ff4f3d92a7484738c081b6","useIcon":""},{"configName":"WMS管理","type":1,"layoutConfigId":"0000015-6a0d609879fe474ca3a78b8a77d593c9","outLink":"","guid":"d3dbb21bc526487690e570bdeb06277c","useIcon":"el-icon-guide","iconColor":""},{"configName":"HRM人事管理","type":1,"layoutConfigId":"0000015-fb141ad7198f48dfa9bb8b757dffc465","outLink":"","guid":"5f99ce7d53fd4ca19d681780b0664f23","useIcon":"el-icon-avatar","iconColor":""},{"configName":"CRM标准版","type":1,"layoutConfigId":"0000015-e59c4f1910024a68ba545440e9a5971a","outLink":"","guid":"b50ef47be6624461b9d8a616dbdc0e0d","useIcon":"el-icon-trend-charts","iconColor":""},{"configName":"ERP（离散制造 - MTO）","type":1,"layoutConfigId":"0000015-0609312dc5344f4996ac1f1d2ca5c2b5","outLink":"","guid":"c21772a8ccd847298f316b9a150db922","useIcon":"el-icon-help-filled","iconColor":""},{"configName":"项目任务管理","type":1,"layoutConfigId":"0000015-3f321971d67b4d63b274650b3797e6d7","outLink":"","guid":"4ac092363c10485ab3614cf0014f2ac1","useIcon":"el-icon-promotion","iconColor":""},{"configName":"HRM人事管理系统","type":1,"layoutConfigId":"0000015-fb141ad7198f48dfa9bb8b757dffc465","outLink":"","openType":0,"guid":"668eaaae8f3341d2812fe5c0f46ef1dd","useIcon":"","iconColor":""}]}',
  //   },
  //   navigationList: [
  //     {
  //       configName: "HRM人事管理系统",
  //       layoutConfigId: "0000015-fb141ad7198f48dfa9bb8b757dffc465",
  //       shareTo: "ALL",
  //       config:
  //         '[{"name":"员工管理","type":1,"entityCode":"parentMenu","outLink":"","guid":"b997ac01eafa4908bc481d1803be6955","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-avatar","iconColor":"","children":[{"name":"员工档案","type":1,"entityCode":1099,"outLink":"","guid":"8cecb78dfc174bcd8f836fdf8b32396c","parentGuid":"b997ac01eafa4908bc481d1803be6955","isOpeneds":false,"useIcon":"el-icon-user","iconColor":"","entityName":"Yuangongdangan"},{"name":"人事证明开具","type":1,"entityCode":1107,"outLink":"","guid":"7503a15edad64b6281adb3dd53e070aa","parentGuid":"b997ac01eafa4908bc481d1803be6955","isOpeneds":false,"useIcon":"el-icon-edit","iconColor":"","entityName":"Renshizhengmingkaiju"}],"entityName":"parentMenu"},{"name":"招聘管理","type":1,"entityCode":"parentMenu","outLink":"","guid":"9f20ede57b814e16a54c889241ed9bda","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-platform","iconColor":"","children":[{"name":"JD基础表","type":1,"entityCode":1109,"outLink":"","guid":"d14b1892840e4a93b0f264c00de3209d","parentGuid":"9f20ede57b814e16a54c889241ed9bda","isOpeneds":false,"useIcon":"el-icon-cellphone","iconColor":"","entityName":"JDjichubiao"},{"name":"招聘需求","type":1,"entityCode":1113,"outLink":"","guid":"f1ca13e3e7434680b78444f5266b582b","parentGuid":"9f20ede57b814e16a54c889241ed9bda","isOpeneds":false,"useIcon":"el-icon-message-box","iconColor":"","entityName":"Zhaopinxuqiu"},{"name":"简历收集及初筛","type":1,"entityCode":1116,"outLink":"","guid":"f0e4d89475f6464ea58f5b8d65908a68","parentGuid":"9f20ede57b814e16a54c889241ed9bda","isOpeneds":false,"useIcon":"el-icon-files","iconColor":"","entityName":"Jianlishoujijichushai"},{"name":"人才库","type":1,"entityCode":1124,"outLink":"","guid":"b4c81f074bf94fbbae5aa7ea15290e7f","parentGuid":"9f20ede57b814e16a54c889241ed9bda","isOpeneds":false,"useIcon":"el-icon-stamp","iconColor":"","entityName":"Rencaiku"}],"entityName":"parentMenu"},{"name":"入转调离","type":1,"entityCode":"parentMenu","outLink":"","guid":"44e4d1c030b041fcad02ab1a3d270e3f","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-sort","iconColor":"","children":[{"name":"入职申请","type":1,"entityCode":1145,"outLink":"","guid":"dfcbff45de834bea88fd1946b33adcbf","parentGuid":"44e4d1c030b041fcad02ab1a3d270e3f","isOpeneds":false,"useIcon":"el-icon-discount","iconColor":"","entityName":"Ruzhishenqing"},{"name":"转正申请","type":1,"entityCode":1139,"outLink":"","guid":"460741ee3d404c2f8862cfae9576bdf8","parentGuid":"44e4d1c030b041fcad02ab1a3d270e3f","isOpeneds":false,"useIcon":"el-icon-check","iconColor":"","entityName":"Zhuanzhengshenqing"},{"name":"岗位调动申请","type":1,"entityCode":1140,"outLink":"","guid":"e07d62e96d414435a8bf90c71ffcee95","parentGuid":"44e4d1c030b041fcad02ab1a3d270e3f","isOpeneds":false,"useIcon":"el-icon-bottom-right","iconColor":"","entityName":"Gangweidiaodongshenqing"},{"name":"离职申请","type":1,"entityCode":1141,"outLink":"","guid":"4797093f70a14dfbbe59abd3911316a9","parentGuid":"44e4d1c030b041fcad02ab1a3d270e3f","isOpeneds":false,"useIcon":"el-icon-back","iconColor":"","entityName":"Lizhishenqing"}],"entityName":"parentMenu"},{"name":"考勤管理","type":1,"entityCode":"parentMenu","outLink":"","guid":"1490b00590a6400594a38bb46d4211d6","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-flag","iconColor":"","children":[{"name":"补卡申请","type":1,"entityCode":1146,"outLink":"","guid":"18406e1939f346ebbba32adb3d6d377a","parentGuid":"1490b00590a6400594a38bb46d4211d6","isOpeneds":false,"useIcon":"el-icon-clock","iconColor":"","entityName":"Kaoqindaka"},{"name":"请假申请","type":1,"entityCode":1147,"outLink":"","guid":"69951fae992d455cbe604d45c4865fb0","parentGuid":"1490b00590a6400594a38bb46d4211d6","isOpeneds":false,"useIcon":"el-icon-orange","iconColor":"","entityName":"Qingjiashenqing"},{"name":"加班申请","type":1,"entityCode":1149,"outLink":"","guid":"c064d210797544ba9ff24aee0b09f032","parentGuid":"1490b00590a6400594a38bb46d4211d6","isOpeneds":false,"useIcon":"el-icon-circle-plus","iconColor":"","entityName":"Jiabanshenqing"},{"name":"出差申请","type":1,"entityCode":1151,"outLink":"","guid":"f0e120ba7a254cedad4c795830fa88da","parentGuid":"1490b00590a6400594a38bb46d4211d6","isOpeneds":false,"useIcon":"el-icon-add-location","iconColor":"","entityName":"Chuchaishenqing"},{"name":"假别基础表","type":1,"entityCode":1152,"outLink":"","guid":"0c551b6ea6404cfc976ee9a94324e066","parentGuid":"1490b00590a6400594a38bb46d4211d6","isOpeneds":false,"useIcon":"el-icon-tickets","iconColor":"","entityName":"Jiabiejichubiao"}],"entityName":"parentMenu"},{"name":"绩效管理","type":1,"entityCode":"parentMenu","outLink":"","guid":"aacea14e055e4fc59ecf29868b8ab42c","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-ticket","iconColor":"","children":[{"name":"绩效考核计划制定","type":1,"entityCode":1153,"outLink":"","guid":"5aa31c68670b49cda422c28725b8e607","parentGuid":"aacea14e055e4fc59ecf29868b8ab42c","isOpeneds":false,"useIcon":"el-icon-circle-check","iconColor":"","entityName":"Jixiaokaohejihuazhiding"},{"name":"绩效结果考核","type":1,"entityCode":1157,"outLink":"","guid":"fe6da2e28cf644edad4d06e368e4c9bd","parentGuid":"aacea14e055e4fc59ecf29868b8ab42c","isOpeneds":false,"useIcon":"el-icon-chicken","iconColor":"","entityName":"Jixiaojieguokaohe"},{"name":"绩效面谈","type":1,"entityCode":1161,"outLink":"","guid":"94896e8a44854409bbd0d55c92ed6ae3","parentGuid":"aacea14e055e4fc59ecf29868b8ab42c","isOpeneds":false,"useIcon":"el-icon-pointer","iconColor":"","entityName":"Jixiaomiantan"},{"name":"绩效考核","type":1,"entityCode":1154,"outLink":"","guid":"3d55700108574f09a8b761e39f18e210","parentGuid":"aacea14e055e4fc59ecf29868b8ab42c","isOpeneds":false,"useIcon":"el-icon-collection-tag","iconColor":"","entityName":"Jixiaokaohe"}],"entityName":"parentMenu"},{"name":"薪酬管理","type":1,"entityCode":"parentMenu","outLink":"","guid":"9d38264bd5b84f0abbf9a954dc6368bb","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-platform","iconColor":"","children":[{"name":"工资计算","type":1,"entityCode":1175,"outLink":"","guid":"a677322b8237468fa6e15f4e9f1bd921","parentGuid":"9d38264bd5b84f0abbf9a954dc6368bb","isOpeneds":false,"useIcon":"el-icon-coin","iconColor":"","entityName":"Gongzijisuan"},{"name":"工资条","type":1,"entityCode":1176,"outLink":"","guid":"3b2944d7ecf14b6ca7bdb3ef0fa450ab","parentGuid":"9d38264bd5b84f0abbf9a954dc6368bb","isOpeneds":false,"useIcon":"el-icon-collection","iconColor":"","entityName":"Gongzitiao"},{"name":"个人所得税税率表","type":1,"entityCode":1179,"outLink":"","guid":"d849eb9086da41f8a908929837cfac65","parentGuid":"9d38264bd5b84f0abbf9a954dc6368bb","isOpeneds":false,"useIcon":"el-icon-coordinate","iconColor":"","entityName":"Gerensuodeshuishuilvbiao"},{"name":"员工薪资结构","type":1,"entityCode":1180,"outLink":"","guid":"83a56bab139746b6aae2715c7a6df076","parentGuid":"9d38264bd5b84f0abbf9a954dc6368bb","isOpeneds":false,"useIcon":"el-icon-connection","iconColor":"","entityName":"Yuangongxinzijiegou"},{"name":"五险一金缴纳基数","type":1,"entityCode":1181,"outLink":"","guid":"2ecf9dd1476e48538fb44d6efbb62d17","parentGuid":"9d38264bd5b84f0abbf9a954dc6368bb","isOpeneds":false,"useIcon":"el-icon-postcard","iconColor":"","entityName":"Wuxianyijinjiaonajishu"},{"name":"专项附加扣除","type":1,"entityCode":1182,"outLink":"","guid":"11c62e1748684ea39ac45ff4c22f6e03","parentGuid":"9d38264bd5b84f0abbf9a954dc6368bb","isOpeneds":false,"useIcon":"el-icon-notification","iconColor":"","entityName":"Zhuanxiangfujiakouchu"}],"entityName":"parentMenu"},{"name":"基础数据","type":1,"entityCode":"parentMenu","outLink":"","guid":"da09a46987e141fa8038f01cf1719d70","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-help-filled","iconColor":"","children":[{"name":"岗位基础表","type":1,"entityCode":1110,"outLink":"","guid":"35b43a394e7b4c859b3affaac530c9f0","parentGuid":"da09a46987e141fa8038f01cf1719d70","isOpeneds":false,"useIcon":"el-icon-tickets","iconColor":"","entityName":"Gangweijichubiao"},{"name":"工作日历","type":1,"entityCode":1111,"outLink":"","guid":"595608bd49494e83b904f385e8825cea","parentGuid":"da09a46987e141fa8038f01cf1719d70","isOpeneds":false,"useIcon":"el-icon-calendar","iconColor":"","entityName":"Gongzuorili"}],"entityName":"parentMenu"}]',
  //     },
  //     {
  //       configName: "ERP（离散制造 - MTO）",
  //       layoutConfigId: "0000015-0609312dc5344f4996ac1f1d2ca5c2b5",
  //       shareTo: "ALL",
  //       config:
  //         '[{"name":"基础数据","type":1,"entityCode":"parentMenu","outLink":"","guid":"f5698abd62ad4306adac6738b17abf49","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-shop","iconColor":"","children":[{"name":"方案设计","type":1,"entityCode":1184,"outLink":"","guid":"12ad7f5c480c40589feefa78b17a3660","parentGuid":"f5698abd62ad4306adac6738b17abf49","isOpeneds":false,"useIcon":"el-icon-chicken","iconColor":"","entityName":"Fangansheji"},{"name":"产品信息","type":1,"entityCode":1185,"outLink":"","guid":"029b79f58c8c4059a8ab28784252bb5c","parentGuid":"f5698abd62ad4306adac6738b17abf49","isOpeneds":false,"useIcon":"el-icon-copy-document","iconColor":"","entityName":"ERPchanpinxinxi"},{"name":"生产工序","type":1,"entityCode":1187,"outLink":"","guid":"2a70e1c8089c4b5bb9f6a1e989836e71","parentGuid":"f5698abd62ad4306adac6738b17abf49","isOpeneds":false,"useIcon":"el-icon-element-plus","iconColor":"","entityName":"Shengchangongxu"}],"entityName":"parentMenu"},{"name":"客户管理","type":1,"entityCode":"parentMenu","outLink":"","guid":"e920f2e46dd045be95291f6ec8c19695","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-avatar","iconColor":"","children":[{"name":"客户管理","type":1,"entityCode":1008,"outLink":"","guid":"0a83a9d09b3f4bb2b0e9eb0d9c9ddd6e","parentGuid":"e920f2e46dd045be95291f6ec8c19695","isOpeneds":false,"useIcon":"el-icon-user","iconColor":"","entityName":"Kehuguanli"}],"entityName":"parentMenu"},{"name":"销售管理","type":1,"entityCode":"parentMenu","outLink":"","guid":"fc52217d171b4790ab981e6828ad66be","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-goods-filled","iconColor":"","children":[{"name":"报价单","type":1,"entityCode":1010,"outLink":"","guid":"edc5528ee036487194cedff98bcf2030","parentGuid":"fc52217d171b4790ab981e6828ad66be","isOpeneds":false,"useIcon":"el-icon-scale-to-original","iconColor":"","entityName":"Baojiadan"},{"name":"销售订单","type":1,"entityCode":1013,"outLink":"","guid":"dc701eb3736749be8b0c30066165de20","parentGuid":"fc52217d171b4790ab981e6828ad66be","isOpeneds":false,"useIcon":"el-icon-connection","iconColor":"","entityName":"Xiaoshoudingdan"},{"name":"销售退货","type":1,"entityCode":1022,"outLink":"","guid":"4f87310903f54e0295e1292864d028a4","parentGuid":"fc52217d171b4790ab981e6828ad66be","isOpeneds":false,"useIcon":"el-icon-bottom-left","iconColor":"","entityName":"Xiaoshoutuihuo"},{"name":"销售出库","type":1,"entityCode":1018,"outLink":"","guid":"78be3b392041476184cc7390b84603b9","parentGuid":"fc52217d171b4790ab981e6828ad66be","isOpeneds":false,"useIcon":"el-icon-document-remove","iconColor":"","entityName":"Xiaoshouchuku"}],"entityName":"parentMenu"},{"name":"生产管理","type":1,"entityCode":"parentMenu","outLink":"","guid":"56b85ddecac84964aefa1824f23c3da9","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-success-filled","iconColor":"","children":[{"name":"生产计划","type":1,"entityCode":1192,"outLink":"","guid":"ccade68d4ee243a38b1b112a0448de1b","parentGuid":"56b85ddecac84964aefa1824f23c3da9","isOpeneds":false,"useIcon":"el-icon-collection","iconColor":"","entityName":"Shengchanjihua"},{"name":"生产工单","type":1,"entityCode":1200,"outLink":"","guid":"6256bd1a752044e480354765c06a9536","parentGuid":"56b85ddecac84964aefa1824f23c3da9","isOpeneds":false,"useIcon":"el-icon-wallet","iconColor":"","entityName":"ERPshengchangongdan"},{"name":"生产领料","type":1,"entityCode":1215,"outLink":"","guid":"3391a4a485924189ad04bd04511ed9b5","parentGuid":"56b85ddecac84964aefa1824f23c3da9","isOpeneds":false,"useIcon":"el-icon-checked","iconColor":"","entityName":"Shengchanlingliao"},{"name":"生产退料","type":1,"entityCode":1216,"outLink":"","guid":"ab744ee377fd4eafaa434c65fb8b0905","parentGuid":"56b85ddecac84964aefa1824f23c3da9","isOpeneds":false,"useIcon":"el-icon-circle-close-filled","iconColor":"","entityName":"Shengchantuiliao"},{"name":"生产报工","type":1,"entityCode":1219,"outLink":"","guid":"85787382f2f94bcf890313130fa476ee","parentGuid":"56b85ddecac84964aefa1824f23c3da9","isOpeneds":false,"useIcon":"el-icon-element-plus","iconColor":"","entityName":"Shengchanbaogong"}],"entityName":"parentMenu"},{"name":"采购管理","type":1,"entityCode":"parentMenu","outLink":"","guid":"79684647889e463fa6bd68c06a9eeaeb","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-shop","iconColor":"","children":[{"name":"供应商管理","type":1,"entityCode":1024,"outLink":"","guid":"adac75c63e284911856f47eb8605054a","parentGuid":"79684647889e463fa6bd68c06a9eeaeb","isOpeneds":false,"useIcon":"el-icon-user-filled","iconColor":"","entityName":"Gongyingshangguanli"},{"name":"采购申请","type":1,"entityCode":1028,"outLink":"","guid":"69c9b882939847d3ab88395ab233ab6f","parentGuid":"79684647889e463fa6bd68c06a9eeaeb","isOpeneds":false,"useIcon":"el-icon-discount","iconColor":"","entityName":"Caigoushenqing"},{"name":"采购订单","type":1,"entityCode":1030,"outLink":"","guid":"ffb07c4dd77c425f99e5ffaa8a192eae","parentGuid":"79684647889e463fa6bd68c06a9eeaeb","isOpeneds":false,"useIcon":"el-icon-star","iconColor":"","entityName":"Caigoudingdan"},{"name":"采购入库","type":1,"entityCode":1034,"outLink":"","guid":"6aebe08c8a6b422e8337c931d3f285e8","parentGuid":"79684647889e463fa6bd68c06a9eeaeb","isOpeneds":false,"useIcon":"el-icon-document-add","iconColor":"","entityName":"Caigouruku"},{"name":"采购退货","type":1,"entityCode":1041,"outLink":"","guid":"60ebf21c84a94350a04a7e16fee215f5","parentGuid":"79684647889e463fa6bd68c06a9eeaeb","isOpeneds":false,"useIcon":"el-icon-close","iconColor":"","entityName":"Caigoutuihuo"}],"entityName":"parentMenu"},{"name":"库存管理","type":1,"entityCode":"parentMenu","outLink":"","guid":"ed4735bad3ef4e609bb3cb34182e95c5","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-wallet-filled","iconColor":"","children":[{"name":"仓库管理","type":1,"entityCode":1006,"outLink":"","guid":"6f6959a04f3e474f96a75a6f63b22a03","parentGuid":"ed4735bad3ef4e609bb3cb34182e95c5","isOpeneds":false,"useIcon":"el-icon-wind-power","iconColor":"","entityName":"Cangkuguanli"},{"name":"其他入库单","type":1,"entityCode":1043,"outLink":"","guid":"7079817a1eb54c4ea13f13163a04e6f3","parentGuid":"ed4735bad3ef4e609bb3cb34182e95c5","isOpeneds":false,"useIcon":"el-icon-circle-plus","iconColor":"","entityName":"Qitarukudan"},{"name":"其他出库单","type":1,"entityCode":1048,"outLink":"","guid":"881249d572a842e5a09f90760494e753","parentGuid":"ed4735bad3ef4e609bb3cb34182e95c5","isOpeneds":false,"useIcon":"el-icon-files","iconColor":"","entityName":"Qitachukudan"},{"name":"库存调拨","type":1,"entityCode":1050,"outLink":"","guid":"5a907a9b8a8346769fa3a89078a96803","parentGuid":"ed4735bad3ef4e609bb3cb34182e95c5","isOpeneds":false,"useIcon":"el-icon-switch","iconColor":"","entityName":"Kucuntiaobo"},{"name":"库存盘点","type":1,"entityCode":1055,"outLink":"","guid":"20ba1c2977db4fd79f86869f0558f4c9","parentGuid":"ed4735bad3ef4e609bb3cb34182e95c5","isOpeneds":false,"useIcon":"el-icon-finished","iconColor":"","entityName":"Kucunpandian"}],"entityName":"parentMenu"},{"name":"财务管理","type":1,"entityCode":"parentMenu","outLink":"","guid":"0a56b60387044cf5aa438dca56ae0326","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-management","iconColor":"","children":[{"name":"应收账款-销售出库","type":1,"entityCode":1057,"outLink":"","guid":"a9637aec74754d6394711938b1a2e0d7","parentGuid":"0a56b60387044cf5aa438dca56ae0326","isOpeneds":false,"useIcon":"el-icon-bottom-left","iconColor":"","entityName":"Yingshouzhangkuanxiaoshouchuku"},{"name":"应收账款-销售退货","type":1,"entityCode":1063,"outLink":"","guid":"2e9e96cd213c4f3da8b19354b6124d08","parentGuid":"0a56b60387044cf5aa438dca56ae0326","isOpeneds":false,"useIcon":"el-icon-circle-close","iconColor":"","entityName":"Kuanxiaoshoutuihuo"},{"name":"应付账款-采购入库","type":1,"entityCode":1064,"outLink":"","guid":"d603e55c48844baa872eef97cb0e4d49","parentGuid":"0a56b60387044cf5aa438dca56ae0326","isOpeneds":false,"useIcon":"el-icon-bottom-right","iconColor":"","entityName":"Yingfuzhangkuancaigouruku"},{"name":"应付账款-采购退货","type":1,"entityCode":1065,"outLink":"","guid":"e644ab65873d457a872c06e4d9baca44","parentGuid":"0a56b60387044cf5aa438dca56ae0326","isOpeneds":false,"useIcon":"el-icon-document-delete","iconColor":"","entityName":"Yingfuzhangkuancaigoutuihuo"},{"name":"应收账款-对账","type":1,"entityCode":1066,"outLink":"","guid":"51b87db39dce490890cc1f318d9d8c0b","parentGuid":"0a56b60387044cf5aa438dca56ae0326","isOpeneds":false,"useIcon":"el-icon-document-checked","iconColor":"","entityName":"Yingshouzhangkuanuizhang"},{"name":"销项发票","type":1,"entityCode":1071,"outLink":"","guid":"261fcef00c764b0582700da7b87b721e","parentGuid":"0a56b60387044cf5aa438dca56ae0326","isOpeneds":false,"useIcon":"el-icon-reading","iconColor":"","entityName":"Xiaoxiangfapiao"},{"name":"应付账款-对账","type":1,"entityCode":1073,"outLink":"","guid":"493f34f9c6814ce8981466abaea598b5","parentGuid":"0a56b60387044cf5aa438dca56ae0326","isOpeneds":false,"useIcon":"el-icon-guide","iconColor":"","entityName":"Yingfuzhangkuan"},{"name":"进项发票","type":1,"entityCode":1076,"outLink":"","guid":"a09b547b80e44285beff4bea2740c94c","parentGuid":"0a56b60387044cf5aa438dca56ae0326","isOpeneds":false,"useIcon":"el-icon-folder-checked","iconColor":"","entityName":"Jinxiangfapiao"},{"name":"付款单","type":1,"entityCode":1077,"outLink":"","guid":"febcae84da4d473db7c55c07c1734809","parentGuid":"0a56b60387044cf5aa438dca56ae0326","isOpeneds":false,"useIcon":"el-icon-scale-to-original","iconColor":"","entityName":"Fukuandan"}],"entityName":"parentMenu"}]',
  //     },
  //     {
  //       configName: "WMS管理系统",
  //       layoutConfigId: "0000015-6a0d609879fe474ca3a78b8a77d593c9",
  //       shareTo: "ALL",
  //       config:
  //         '[{"name":"基础数据","type":1,"entityCode":"parentMenu","outLink":"","guid":"db7378f7c0b443e1a88e8a7388030ed2","parentGuid":"","isOpeneds":true,"useIcon":"el-icon-menu","children":[{"name":"产品信息","type":1,"entityCode":1012,"outLink":"","guid":"44d1dfbe7ca04b259b049670edaf3da9","parentGuid":"db7378f7c0b443e1a88e8a7388030ed2","isOpeneds":false,"useIcon":"el-icon-document-copy","entityName":"WMSchanpinxinxi","iconColor":""},{"name":"仓库信息","type":1,"entityCode":1017,"outLink":"","guid":"17a8c7591c464213894d0f9bbd9f0f4e","parentGuid":"db7378f7c0b443e1a88e8a7388030ed2","isOpeneds":false,"useIcon":"el-icon-sold-out","entityName":"WMScangkuxinxi","iconColor":""},{"name":"仓位信息","type":1,"entityCode":1020,"outLink":"","guid":"71ddf58b81b642dc82a3f71904a55c2c","parentGuid":"db7378f7c0b443e1a88e8a7388030ed2","isOpeneds":false,"useIcon":"el-icon-price-tag","entityName":"WMScangweixinxi","iconColor":""}],"entityName":"parentMenu","iconColor":""},{"name":"供应商管理","type":1,"entityCode":"parentMenu","outLink":"","guid":"08fbc5e21cc0440fab089e26ba53f5bf","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-avatar","iconColor":"","children":[{"name":"供应商信息","type":1,"entityCode":1021,"outLink":"","guid":"fa17a91e4452499ab00d0b98158b8118","parentGuid":"08fbc5e21cc0440fab089e26ba53f5bf","isOpeneds":false,"useIcon":"el-icon-user","iconColor":"","entityName":"WMSgongyingshangxinxi"},{"name":"供应商价格表","type":1,"entityCode":1039,"outLink":"","guid":"fd4a854c4506460b9bd03b34b0863221","parentGuid":"08fbc5e21cc0440fab089e26ba53f5bf","isOpeneds":false,"useIcon":"el-icon-cellphone","iconColor":"","entityName":"WMSgongyingshangjiagebiao"},{"name":"供应商送货信息","type":1,"entityCode":1040,"outLink":"","guid":"5263de7a3f904eb5a66f9b9bfee415bf","parentGuid":"08fbc5e21cc0440fab089e26ba53f5bf","isOpeneds":false,"useIcon":"el-icon-guide","iconColor":"","entityName":"WMSgongyingshangsonghuoxinxi"}],"entityName":"parentMenu"},{"name":"采购管理","type":1,"entityCode":"parentMenu","outLink":"","guid":"f931dff68743479e9b7e1c9b9251149d","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-checked","iconColor":"","children":[{"name":"采购申请","type":1,"entityCode":1045,"outLink":"","guid":"1df56c7d713a47fe81f182e616d496d2","parentGuid":"f931dff68743479e9b7e1c9b9251149d","isOpeneds":false,"useIcon":"el-icon-shopping-cart","iconColor":"","entityName":"WMScaigoushenqing"},{"name":"采购需求池","type":1,"entityCode":1047,"outLink":"","guid":"5fd5395644b44904b1ff74ef3b56b5a9","parentGuid":"f931dff68743479e9b7e1c9b9251149d","isOpeneds":false,"useIcon":"el-icon-document-copy","iconColor":"","entityName":"WMScaigouxuqiuchi"},{"name":"采购询报价","type":1,"entityCode":1052,"outLink":"","guid":"1e929cad57a442cda539794577ce455b","parentGuid":"f931dff68743479e9b7e1c9b9251149d","isOpeneds":false,"useIcon":"el-icon-notebook","iconColor":"","entityName":"WMScaigouxunbaojia"},{"name":"采购订单","type":1,"entityCode":1085,"outLink":"","guid":"5be3ad4ba37041c79029052af13436f3","parentGuid":"f931dff68743479e9b7e1c9b9251149d","isOpeneds":false,"useIcon":"el-icon-help","iconColor":"","entityName":"WMScaigoudingdan"}],"entityName":"parentMenu"},{"name":"来料管理","type":1,"entityCode":"parentMenu","outLink":"","guid":"17204d6e303742b38194494a39822099","parentGuid":"","isOpeneds":true,"useIcon":"el-icon-wallet-filled","iconColor":"","children":[{"name":"供货商送货单","type":1,"entityCode":1089,"outLink":"","guid":"49fc9206fa164acfbc031e8ff234edfc","parentGuid":"17204d6e303742b38194494a39822099","isOpeneds":false,"useIcon":"el-icon-document-add","iconColor":"","entityName":"WMSgonghuoshangsonghuodan"},{"name":"采购收货单","type":1,"entityCode":1091,"outLink":"","guid":"df15a9cbbc544f2c80ae9d18222258f8","parentGuid":"17204d6e303742b38194494a39822099","isOpeneds":false,"useIcon":"el-icon-document-checked","iconColor":"","entityName":"WMScaigoushouhuodan"},{"name":"来料质检单","type":1,"entityCode":1093,"outLink":"","guid":"6e820c83c8ec473f9479d300beb69923","parentGuid":"17204d6e303742b38194494a39822099","isOpeneds":false,"useIcon":"el-icon-connection","iconColor":"","entityName":"WMSlailiaozhijiandan"},{"name":"采购入库","type":1,"entityCode":1095,"outLink":"","guid":"e6cc935cabb4429aadfbdbf97a87b81b","parentGuid":"17204d6e303742b38194494a39822099","isOpeneds":false,"useIcon":"el-icon-bottom-right","iconColor":"","entityName":"WMScaigouruku"},{"name":"采购退货","type":1,"entityCode":1097,"outLink":"","guid":"22a3603b859e42cda6bd5d033dae1f81","parentGuid":"17204d6e303742b38194494a39822099","isOpeneds":false,"useIcon":"el-icon-bottom-left","iconColor":"","entityName":"WMScaigoutuihuo"}],"entityName":"parentMenu"},{"name":"拣配管理","type":1,"entityCode":"parentMenu","outLink":"","guid":"610a8e9529ac42da802afbc2cd8b7b81","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-success-filled","iconColor":"","children":[{"name":"生产工单","type":1,"entityCode":1100,"outLink":"","guid":"abd8be6bdcd540e2ac232b7f7d9c6d9a","parentGuid":"610a8e9529ac42da802afbc2cd8b7b81","isOpeneds":false,"useIcon":"el-icon-collection","iconColor":"","entityName":"Shengchangongdan"},{"name":"备料通知单","type":1,"entityCode":1101,"outLink":"","guid":"2635342201c04baaac8e3b01903e97d6","parentGuid":"610a8e9529ac42da802afbc2cd8b7b81","isOpeneds":false,"useIcon":"el-icon-bell","iconColor":"","entityName":"WMSbeiliaotongzhidan"},{"name":"拣配备料单","type":1,"entityCode":1104,"outLink":"","guid":"2353dde0aa5043dfaa082b7c93997e35","parentGuid":"610a8e9529ac42da802afbc2cd8b7b81","isOpeneds":false,"useIcon":"el-icon-collection-tag","iconColor":"","entityName":"WMSjianpeibeiliaodan"},{"name":"备料池","type":1,"entityCode":1106,"outLink":"","guid":"51f8e9fe77304b05a968572c78c2f57c","parentGuid":"610a8e9529ac42da802afbc2cd8b7b81","isOpeneds":false,"useIcon":"el-icon-basketball","iconColor":"","entityName":"WMSbeiliaochi"},{"name":"领料出库","type":1,"entityCode":1108,"outLink":"","guid":"a28f186716fa49cda7803af1c03eee66","parentGuid":"610a8e9529ac42da802afbc2cd8b7b81","isOpeneds":false,"useIcon":"el-icon-folder-checked","iconColor":"","entityName":"WMSlingliaochuku"},{"name":"退料入库","type":1,"entityCode":1112,"outLink":"","guid":"f9c52df14068481da4c1bea69f31332b","parentGuid":"610a8e9529ac42da802afbc2cd8b7b81","isOpeneds":false,"useIcon":"el-icon-finished","iconColor":"","entityName":"WMStuiliaoruku"}],"entityName":"parentMenu"},{"name":"库存管理","type":1,"entityCode":"parentMenu","outLink":"","guid":"e1098f0d3bcb461ca998d8c00428e48a","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-shop","iconColor":"","children":[{"name":"其他入库单","type":1,"entityCode":1120,"outLink":"","guid":"fd5807f47e38449aa7d8eccc37e0f80b","parentGuid":"e1098f0d3bcb461ca998d8c00428e48a","isOpeneds":false,"useIcon":"el-icon-circle-check","iconColor":"","entityName":"WMSqitarukudan"},{"name":"其他出库单","type":1,"entityCode":1123,"outLink":"","guid":"37041e94e5d74248af05c308072d4799","parentGuid":"e1098f0d3bcb461ca998d8c00428e48a","isOpeneds":false,"useIcon":"el-icon-circle-close","iconColor":"","entityName":"WMSqitachukudan"},{"name":"库存调拨","type":1,"entityCode":1128,"outLink":"","guid":"9ef7dd16fb6f42a29248b4595f90ef39","parentGuid":"e1098f0d3bcb461ca998d8c00428e48a","isOpeneds":false,"useIcon":"el-icon-sort","iconColor":"","entityName":"WMSkucuntiaobo"},{"name":"库存盘点","type":1,"entityCode":1132,"outLink":"","guid":"f94ff6d8d8d743f09d4de2ddcfd16eba","parentGuid":"e1098f0d3bcb461ca998d8c00428e48a","isOpeneds":false,"useIcon":"el-icon-scale-to-original","iconColor":"","entityName":"WMSkucunpandian"}],"entityName":"parentMenu"},{"name":"财务管理","type":1,"entityCode":"parentMenu","outLink":"","guid":"1ceb4c96d0094b9388617fc7f731b0dc","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-trend-charts","iconColor":"","children":[{"name":"采购入库账单","type":1,"entityCode":1058,"outLink":"","guid":"3a92bf0fcaae4d61876e14076609bc0c","parentGuid":"1ceb4c96d0094b9388617fc7f731b0dc","isOpeneds":false,"useIcon":"el-icon-link","iconColor":"","entityName":"WMScaigourukuzhangdan"},{"name":"采购退货账单","type":1,"entityCode":1069,"outLink":"","guid":"bd2f7cbc7ba643458fea11fe2901a9a4","parentGuid":"1ceb4c96d0094b9388617fc7f731b0dc","isOpeneds":false,"useIcon":"el-icon-sold-out","iconColor":"","entityName":"WMScaigoutuihuozhangdan"},{"name":"账款对账","type":1,"entityCode":1060,"outLink":"","guid":"5d582de47fad4b9ab999be6a53b9509a","parentGuid":"1ceb4c96d0094b9388617fc7f731b0dc","isOpeneds":false,"useIcon":"el-icon-postcard","iconColor":"","entityName":"WMSzhangkuanduizhang"},{"name":"进项发票","type":1,"entityCode":1061,"outLink":"","guid":"5779eb74d2164273908c37cb3c659482","parentGuid":"1ceb4c96d0094b9388617fc7f731b0dc","isOpeneds":false,"useIcon":"el-icon-chicken","iconColor":"","entityName":"WMSjinxiangfapiao"},{"name":"付款单","type":1,"entityCode":1062,"outLink":"","guid":"7faf591fffdf49b7a8f3c8bf05e106c2","parentGuid":"1ceb4c96d0094b9388617fc7f731b0dc","isOpeneds":false,"useIcon":"el-icon-notification","iconColor":"","entityName":"WMSfukuandan"}],"entityName":"parentMenu"}]',
  //     },
  //     {
  //       configName: "CRM客户管理（标准版）",
  //       layoutConfigId: "0000015-e59c4f1910024a68ba545440e9a5971a",
  //       shareTo: "ALL",
  //       config:
  //         '[{"name":"市场及线索管理","type":1,"entityCode":"parentMenu","outLink":"","guid":"d1ce520f4195444b97a6f0c47ddb0a11","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-management","iconColor":"","children":[{"name":"市场活动记录","type":1,"entityCode":1142,"outLink":"","guid":"25bdf2f0f9dd4507b3e2529e4adfb61d","parentGuid":"d1ce520f4195444b97a6f0c47ddb0a11","isOpeneds":false,"useIcon":"el-icon-document-copy","iconColor":"","entityName":"CRMshichanghuodongjilu"},{"name":"线索池","type":1,"entityCode":1143,"outLink":"","guid":"fde5e1b9989745f2a5bd222fc9d39949","parentGuid":"d1ce520f4195444b97a6f0c47ddb0a11","isOpeneds":false,"useIcon":"el-icon-orange","iconColor":"","entityName":"CRMxiansuochi"},{"name":"线索","type":1,"entityCode":1160,"outLink":"","guid":"5d341aa2c42545d79b6720116cacf10e","parentGuid":"d1ce520f4195444b97a6f0c47ddb0a11","isOpeneds":false,"useIcon":"el-icon-checked","iconColor":"","entityName":"CRMxiansuo"}],"entityName":"parentMenu"},{"name":"客户及商机管理","type":1,"entityCode":"parentMenu","outLink":"","guid":"eb00296f55e642608a5916975cc47b90","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-coordinate","iconColor":"","children":[{"name":"公海池","type":1,"entityCode":1162,"outLink":"","guid":"126a72d786884db7b63cd08c0b1a5a99","parentGuid":"eb00296f55e642608a5916975cc47b90","isOpeneds":false,"useIcon":"el-icon-data-board","iconColor":"","entityName":"CRMkehu"},{"name":"客户","type":1,"entityCode":1164,"outLink":"","guid":"97eef566af77486dae4b112b27c7cd3e","parentGuid":"eb00296f55e642608a5916975cc47b90","isOpeneds":false,"useIcon":"el-icon-avatar","iconColor":"","entityName":"CRMgonghaichi"},{"name":"联系人","type":1,"entityCode":1165,"outLink":"","guid":"9c1d5a1b094640af925f2d86c71f0ab0","parentGuid":"eb00296f55e642608a5916975cc47b90","isOpeneds":false,"useIcon":"el-icon-user","iconColor":"","entityName":"CRMlianxiren"},{"name":"商机","type":1,"entityCode":1166,"outLink":"","guid":"a831e5c30e5241a8a097de54d9257447","parentGuid":"eb00296f55e642608a5916975cc47b90","isOpeneds":false,"useIcon":"el-icon-home-filled","iconColor":"","entityName":"CRMshangji"}],"entityName":"parentMenu"},{"name":"产品报价管理","type":1,"entityCode":"parentMenu","outLink":"","guid":"9b2beea345ac4a14a0e1a200706b6ac7","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-document-remove","iconColor":"","children":[{"name":"产品报价","type":1,"entityCode":1169,"outLink":"","guid":"49b19a06f5ae41839050fca5d279ddbc","parentGuid":"9b2beea345ac4a14a0e1a200706b6ac7","isOpeneds":false,"useIcon":"el-icon-files","iconColor":"","entityName":"CRMchanpinbaojia"},{"name":"产品明细","type":1,"entityCode":1168,"outLink":"","guid":"96b76e6a68b1468cb77721a4ca481ec1","parentGuid":"9b2beea345ac4a14a0e1a200706b6ac7","isOpeneds":false,"useIcon":"el-icon-credit-card","iconColor":"","entityName":"CRMchanpinmingxi"}],"entityName":"parentMenu"},{"name":"合同管理","type":1,"entityCode":"parentMenu","outLink":"","guid":"acca44df31d14c78939ddd7c6d9c015e","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-folder-opened","iconColor":"","children":[{"name":"合同订单","type":1,"entityCode":1171,"outLink":"","guid":"ce3d47e43db14d8e9491672677acce07","parentGuid":"acca44df31d14c78939ddd7c6d9c015e","isOpeneds":false,"useIcon":"el-icon-copy-document","iconColor":"","entityName":"CRMhetongdingdan"}],"entityName":"parentMenu"},{"name":"财务管理","type":1,"entityCode":"parentMenu","outLink":"","guid":"3d02bc3d929c47259f7c57374d9512a5","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-list","iconColor":"","children":[{"name":"应收计划","type":1,"entityCode":1173,"outLink":"","guid":"7892720fa6a040759772b26ff11992dd","parentGuid":"3d02bc3d929c47259f7c57374d9512a5","isOpeneds":false,"useIcon":"el-icon-discount","iconColor":"","entityName":"CRMyingshoujihua"},{"name":"回款单","type":1,"entityCode":1177,"outLink":"","guid":"c6ac4a09d6784f42a0ec769db693a912","parentGuid":"3d02bc3d929c47259f7c57374d9512a5","isOpeneds":false,"useIcon":"el-icon-football","iconColor":"","entityName":"CRMhuikuandan"},{"name":"开票申请","type":1,"entityCode":1178,"outLink":"","guid":"e447f8b85dce42979be954626fcc9d79","parentGuid":"3d02bc3d929c47259f7c57374d9512a5","isOpeneds":false,"useIcon":"el-icon-coin","iconColor":"","entityName":"CRMkaipiaoshenqing"},{"name":"财务信息","type":1,"entityCode":1174,"outLink":"","guid":"1fc4e1b0efaf4c5496c30dd6b1ebbdda","parentGuid":"3d02bc3d929c47259f7c57374d9512a5","isOpeneds":false,"useIcon":"el-icon-notebook","iconColor":"","entityName":"CRMcaiwuxinxi"}],"entityName":"parentMenu"},{"name":"售后管理","type":1,"entityCode":"parentMenu","outLink":"","guid":"2d018aa28fb94f4ba46c66fd444a6e09","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-money","iconColor":"","children":[{"name":"服务工单","type":1,"entityCode":1183,"outLink":"","guid":"6dde4574414d4685b3ba60d57e38c526","parentGuid":"2d018aa28fb94f4ba46c66fd444a6e09","isOpeneds":false,"useIcon":"el-icon-postcard","iconColor":"","entityName":"CRMfuwugongdan"},{"name":"换货申请","type":1,"entityCode":1188,"outLink":"","guid":"111b82ad49ff4da79b576c088d4fbdbf","parentGuid":"2d018aa28fb94f4ba46c66fd444a6e09","isOpeneds":false,"useIcon":"el-icon-medal","iconColor":"","entityName":"CRMhuanhuoshenqing"},{"name":"退货申请","type":1,"entityCode":1194,"outLink":"","guid":"078b5f6af7da4b3e979d565d2bdd34be","parentGuid":"2d018aa28fb94f4ba46c66fd444a6e09","isOpeneds":false,"useIcon":"el-icon-message-box","iconColor":"","entityName":"CRMtuihuoshenqing"}],"entityName":"parentMenu"}]',
  //     },
  //     {
  //       configName: "项目任务管理系统",
  //       layoutConfigId: "0000015-3f321971d67b4d63b274650b3797e6d7",
  //       shareTo: "ALL",
  //       config:
  //         '[{"name":"项目任务","type":1,"entityCode":"parentMenu","outLink":"","guid":"9aada5cce4f1453eb72cdc987f061ddc","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-list","iconColor":"","children":[{"name":"项目集","type":1,"entityCode":1199,"outLink":"","guid":"aa8f718f57bd4927af38df0cb889ed3f","parentGuid":"9aada5cce4f1453eb72cdc987f061ddc","isOpeneds":false,"useIcon":"el-icon-folder-opened","iconColor":"","entityName":"Xiangmuji"},{"name":"项目","type":1,"entityCode":1196,"outLink":"","guid":"39cb6e2c05ca4ea989297cb2ec07a8d3","parentGuid":"9aada5cce4f1453eb72cdc987f061ddc","isOpeneds":false,"useIcon":"el-icon-document-remove","iconColor":"","entityName":"Xiangmu"},{"name":"任务","type":1,"entityCode":1197,"outLink":"","guid":"0091025cd1ff4b04928760795d8eec95","parentGuid":"9aada5cce4f1453eb72cdc987f061ddc","isOpeneds":false,"useIcon":"el-icon-collection-tag","iconColor":"","entityName":"Renwu"},{"name":"子任务","type":1,"entityCode":1198,"outLink":"","guid":"eebfd1c3e18b4e9b844fa81e609398ab","parentGuid":"9aada5cce4f1453eb72cdc987f061ddc","isOpeneds":false,"useIcon":"el-icon-discount","iconColor":"","entityName":"Zirenwu"}],"entityName":"parentMenu"},{"name":"任务执行验收","type":1,"entityCode":"parentMenu","outLink":"","guid":"f766735bc6714e63b02c81eee2edd45f","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-notebook","iconColor":"","children":[{"name":"项目任务执行","type":1,"entityCode":1201,"outLink":"","guid":"2ea20de7baac4579b9efd3bd33bebb71","parentGuid":"f766735bc6714e63b02c81eee2edd45f","isOpeneds":false,"useIcon":"el-icon-guide","iconColor":"","entityName":"Xiangmurenwuzhixing"},{"name":"工时登记","type":1,"entityCode":1202,"outLink":"","guid":"13c6f355ad044d529e9df6d006bd2bc3","parentGuid":"f766735bc6714e63b02c81eee2edd45f","isOpeneds":false,"useIcon":"el-icon-notebook","iconColor":"","entityName":"Gongshidengji"},{"name":"费用登记","type":1,"entityCode":1203,"outLink":"","guid":"c60934f78ee7476b9b21a86f39049a52","parentGuid":"f766735bc6714e63b02c81eee2edd45f","isOpeneds":false,"useIcon":"el-icon-document-copy","iconColor":"","entityName":"Feiyongdengji"}],"entityName":"parentMenu"},{"name":"目标/公告","type":1,"entityCode":"parentMenu","outLink":"","guid":"af4862adeca4421fbe542d2648067168","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-office-building","iconColor":"","children":[{"name":"目标周期","type":1,"entityCode":1204,"outLink":"","guid":"118786aeac50449898a5a4db9adb4fe4","parentGuid":"af4862adeca4421fbe542d2648067168","isOpeneds":false,"useIcon":"el-icon-chicken","iconColor":"","entityName":"Mubiaozhouqi"},{"name":"目标","type":1,"entityCode":1205,"outLink":"","guid":"89f5d3bfbf264d86bb4644e94ab78d1d","parentGuid":"af4862adeca4421fbe542d2648067168","isOpeneds":false,"useIcon":"el-icon-cherry","iconColor":"","entityName":"Mubiao"},{"name":"发布公告","type":1,"entityCode":1206,"outLink":"","guid":"1833a0947be94c58b0d3d54480eed28b","parentGuid":"af4862adeca4421fbe542d2648067168","isOpeneds":false,"useIcon":"el-icon-connection","iconColor":"","entityName":"Fabugonggao"}],"entityName":"parentMenu"},{"name":"简报","type":1,"entityCode":"parentMenu","outLink":"","guid":"87c0451f6ec341df9b1f814a40d4a3eb","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-loading","iconColor":"","children":[{"name":"日程","type":1,"entityCode":1209,"outLink":"","guid":"23e19525f02149e495a89e6fef02c8c1","parentGuid":"87c0451f6ec341df9b1f814a40d4a3eb","isOpeneds":false,"useIcon":"el-icon-location","iconColor":"","entityName":"Richeng"},{"name":"日报","type":1,"entityCode":1210,"outLink":"","guid":"2b3952f8652641eaa6deef84bb1314fd","parentGuid":"87c0451f6ec341df9b1f814a40d4a3eb","isOpeneds":false,"useIcon":"el-icon-location-information","iconColor":"","entityName":"Ribao"},{"name":"周报 ","type":1,"entityCode":1211,"outLink":"","guid":"45b7a89a8271443b898a905ab6a5941c","parentGuid":"87c0451f6ec341df9b1f814a40d4a3eb","isOpeneds":false,"useIcon":"el-icon-map-location","iconColor":"","entityName":"Zhoubao"},{"name":"月报","type":1,"entityCode":1212,"outLink":"","guid":"40a32cabd6fc4d1b85b424475dca2e17","parentGuid":"87c0451f6ec341df9b1f814a40d4a3eb","isOpeneds":false,"useIcon":"el-icon-location-filled","iconColor":"","entityName":"Yuebao"}],"entityName":"parentMenu"},{"name":"审批","type":1,"entityCode":"parentMenu","outLink":"","guid":"cfce485d9d47445ea6093e73e9455530","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-price-tag","iconColor":"","children":[{"name":"通用审批","type":1,"entityCode":1222,"outLink":"","guid":"4180db2172704c968488cca09600626b","parentGuid":"cfce485d9d47445ea6093e73e9455530","isOpeneds":false,"useIcon":"el-icon-milk-tea","iconColor":"","entityName":"Tongyongshenpi"},{"name":"报销申请","type":1,"entityCode":1223,"outLink":"","guid":"3bf65e8f23b842a0a7b01b64095ba282","parentGuid":"cfce485d9d47445ea6093e73e9455530","isOpeneds":false,"useIcon":"el-icon-grape","iconColor":"","entityName":"Baoxiaoshenqing"},{"name":"物品领用","type":1,"entityCode":1226,"outLink":"","guid":"90474074e08440e0b6e6391c5dc85f70","parentGuid":"cfce485d9d47445ea6093e73e9455530","isOpeneds":false,"useIcon":"el-icon-odometer","iconColor":"","entityName":"Wupinlingyong"},{"name":"请假申请","type":1,"entityCode":1227,"outLink":"","guid":"438852ec981d412cae75446a2e695fa6","parentGuid":"cfce485d9d47445ea6093e73e9455530","isOpeneds":false,"useIcon":"el-icon-finished","iconColor":"","entityName":"Xiangmurenwuguanliqingjiash"}],"entityName":"parentMenu"}]',
  //     },
  //     {
  //       configName: "进销存（标准版）",
  //       layoutConfigId: "0000015-79422574b2ce4a159252c608e9c883e4",
  //       shareTo: "ALL",
  //       config:
  //         '[{"name":"基础数据","type":1,"entityCode":"parentMenu","outLink":"","guid":"b63f80af9c834f8989eb41de99272367","parentGuid":"","isOpeneds":true,"useIcon":"el-icon-management","children":[{"name":"产品信息","type":1,"entityCode":1001,"outLink":"","guid":"6ec5b555613842479f7b8a6173937699","parentGuid":"b63f80af9c834f8989eb41de99272367","isOpeneds":false,"useIcon":"el-icon-box","entityName":"Chanpinxinxi","iconColor":""},{"name":"仓库管理","type":1,"entityCode":1006,"outLink":"","guid":"cec36a2c47364f34bbdaddd72d08bf45","parentGuid":"b63f80af9c834f8989eb41de99272367","isOpeneds":false,"useIcon":"el-icon-notification","entityName":"Cangkuguanli","iconColor":""}],"entityName":"parentMenu","iconColor":""},{"name":"客户管理","type":1,"entityCode":"parentMenu","outLink":"","guid":"fa313865b5c74a0b970fe58b1a833006","parentGuid":"","isOpeneds":true,"useIcon":"el-icon-avatar","children":[{"name":"客户信息","type":1,"entityCode":1008,"outLink":"","guid":"4eaabd2a63094737ab0c5e8276ab6149","parentGuid":"fa313865b5c74a0b970fe58b1a833006","isOpeneds":false,"useIcon":"el-icon-user","entityName":"Kehuguanli","iconColor":""}],"entityName":"parentMenu","iconColor":""},{"name":"销售管理","type":1,"entityCode":"parentMenu","outLink":"","guid":"82ffdf2c13be4c7180db984262be4f38","parentGuid":"","isOpeneds":true,"useIcon":"el-icon-goods-filled","iconColor":"","entityName":"parentMenu","children":[{"name":"报价单","type":1,"entityCode":1010,"outLink":"","guid":"0f8fb2a59d4f43bc9bb02a2ea5e7ef62","parentGuid":"82ffdf2c13be4c7180db984262be4f38","isOpeneds":false,"useIcon":"el-icon-document","iconColor":"","entityName":"Baojiadan"},{"name":"销售订单","type":1,"entityCode":1013,"outLink":"","guid":"2d3f968d43b145cb9071f963b0386eba","parentGuid":"82ffdf2c13be4c7180db984262be4f38","isOpeneds":false,"useIcon":"el-icon-link","iconColor":"","entityName":"Xiaoshoudingdan"},{"name":"销售出库","type":1,"entityCode":1018,"outLink":"","guid":"c4035432864c49899e760ac6a0d7dcbd","parentGuid":"82ffdf2c13be4c7180db984262be4f38","isOpeneds":false,"useIcon":"el-icon-document-remove","iconColor":"","entityName":"Xiaoshouchuku"},{"name":"销售退货","type":1,"entityCode":1022,"outLink":"","guid":"a9fd96943865473eb21bf53bcbf421fe","parentGuid":"82ffdf2c13be4c7180db984262be4f38","isOpeneds":false,"useIcon":"el-icon-warning","iconColor":"","entityName":"Xiaoshoutuihuo"}]},{"name":"采购管理","type":1,"entityCode":"parentMenu","outLink":"","guid":"1afc4e5f41b444c3acec1195cbcd9a67","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-shop","iconColor":"","entityName":"parentMenu","children":[{"name":"供应商管理","type":1,"entityCode":1024,"outLink":"","guid":"4aebfd24c48d4135bb0f82038aa6f980","parentGuid":"1afc4e5f41b444c3acec1195cbcd9a67","isOpeneds":false,"useIcon":"el-icon-stamp","iconColor":"","entityName":"Gongyingshangguanli"},{"name":"供应商价格表","type":1,"entityCode":1027,"outLink":"","guid":"f9fbfab1a9e6493e8c2302d2e65db838","parentGuid":"1afc4e5f41b444c3acec1195cbcd9a67","isOpeneds":false,"useIcon":"el-icon-cellphone","iconColor":"","entityName":"Gongyingshangjiagebiao"},{"name":"采购申请","type":1,"entityCode":1028,"outLink":"","guid":"50b27b7ce6c740cdbdb2749e3d087b19","parentGuid":"1afc4e5f41b444c3acec1195cbcd9a67","isOpeneds":false,"useIcon":"el-icon-checked","iconColor":"","entityName":"Caigoushenqing"},{"name":"采购订单","type":1,"entityCode":1030,"outLink":"","guid":"28827aaad2464a2890a719df57c95583","parentGuid":"1afc4e5f41b444c3acec1195cbcd9a67","isOpeneds":false,"useIcon":"el-icon-expand","iconColor":"","entityName":"Caigoudingdan"},{"name":"采购入库","type":1,"entityCode":1034,"outLink":"","guid":"e2294bdb1a87493b863051ad771782bb","parentGuid":"1afc4e5f41b444c3acec1195cbcd9a67","isOpeneds":false,"useIcon":"el-icon-sell","iconColor":"","entityName":"Caigouruku"},{"name":"采购退货","type":1,"entityCode":1041,"outLink":"","guid":"8a0d5190dbce41cbb222e4186b9cc617","parentGuid":"1afc4e5f41b444c3acec1195cbcd9a67","isOpeneds":false,"useIcon":"el-icon-top-right","iconColor":"","entityName":"Caigoutuihuo"}]},{"name":"库存管理","type":1,"entityCode":"parentMenu","outLink":"","guid":"ef7b6b86ccd842429e2ec533d5945e51","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-list","iconColor":"","children":[{"name":"其他入库单","type":1,"entityCode":1043,"outLink":"","guid":"609ded7db8eb465cb8206927f95321dc","parentGuid":"ef7b6b86ccd842429e2ec533d5945e51","isOpeneds":false,"useIcon":"el-icon-copy-document","iconColor":"","entityName":"Qitarukudan"},{"name":"其他出库单","type":1,"entityCode":1048,"outLink":"","guid":"1335b2f3b86b4ed28e7dc614c5ef7f0f","parentGuid":"ef7b6b86ccd842429e2ec533d5945e51","isOpeneds":false,"useIcon":"el-icon-coin","iconColor":"","entityName":"Qitachukudan"},{"name":"库存调拨","type":1,"entityCode":1050,"outLink":"","guid":"abd711b935af417e97ac3c86a68e2496","parentGuid":"ef7b6b86ccd842429e2ec533d5945e51","isOpeneds":false,"useIcon":"el-icon-switch","iconColor":"","entityName":"Kucuntiaobo"},{"name":"库存盘点","type":1,"entityCode":1055,"outLink":"","guid":"a0a09f0d625341d3b5fc242e644dd335","parentGuid":"ef7b6b86ccd842429e2ec533d5945e51","isOpeneds":false,"useIcon":"el-icon-circle-check","iconColor":"","entityName":"Kucunpandian"}],"entityName":"parentMenu"},{"name":"财务管理","type":1,"entityCode":"parentMenu","outLink":"","guid":"4e71a2c2e49b4605afc711bf493f1abb","parentGuid":"","isOpeneds":false,"useIcon":"el-icon-ticket","iconColor":"","children":[{"name":"应收账款-销售出库","type":1,"entityCode":1057,"outLink":"","guid":"8c1d5c0f66a041e08f6f81ee80417bb9","parentGuid":"4e71a2c2e49b4605afc711bf493f1abb","isOpeneds":false,"useIcon":"el-icon-document-remove","iconColor":"","entityName":"Yingshouzhangkuanxiaoshouchuku"},{"name":"应收账款-销售退货","type":1,"entityCode":1063,"outLink":"","guid":"96643676c9304a80aabddcf309dd0bc6","parentGuid":"4e71a2c2e49b4605afc711bf493f1abb","isOpeneds":false,"useIcon":"el-icon-close","iconColor":"","entityName":"Kuanxiaoshoutuihuo"},{"name":"应付账款-采购入库","type":1,"entityCode":1064,"outLink":"","guid":"3b9ca100af7d417dbc039ba3cf1d1283","parentGuid":"4e71a2c2e49b4605afc711bf493f1abb","isOpeneds":false,"useIcon":"el-icon-document-add","iconColor":"","entityName":"Yingfuzhangkuancaigouruku"},{"name":"应付账款-采购退货","type":1,"entityCode":1065,"outLink":"","guid":"26016c7f9b944117b2eb1d7c8c05108c","parentGuid":"4e71a2c2e49b4605afc711bf493f1abb","isOpeneds":false,"useIcon":"el-icon-remove","iconColor":"","entityName":"Yingfuzhangkuancaigoutuihuo"},{"name":"应收账款-对账","type":1,"entityCode":1066,"outLink":"","guid":"ab0ffde16d3d4931ac871396a6673609","parentGuid":"4e71a2c2e49b4605afc711bf493f1abb","isOpeneds":false,"useIcon":"el-icon-finished","iconColor":"","entityName":"Yingshouzhangkuanuizhang"},{"name":"销项发票","type":1,"entityCode":1071,"outLink":"","guid":"2b95eb91dfea4b7d901453d3d6eb11b6","parentGuid":"4e71a2c2e49b4605afc711bf493f1abb","isOpeneds":false,"useIcon":"el-icon-collection","iconColor":"","entityName":"Xiaoxiangfapiao"},{"name":"收款单","type":1,"entityCode":1072,"outLink":"","guid":"3fe1ead146034a7986586fd6fb4567c8","parentGuid":"4e71a2c2e49b4605afc711bf493f1abb","isOpeneds":false,"useIcon":"el-icon-document-copy","iconColor":"","entityName":"Shoukuandan"},{"name":"应付账款-对账","type":1,"entityCode":1073,"outLink":"","guid":"13b5bec5e5fd487daff1b2c5750097fe","parentGuid":"4e71a2c2e49b4605afc711bf493f1abb","isOpeneds":false,"useIcon":"el-icon-guide","iconColor":"","entityName":"Yingfuzhangkuan"},{"name":"进项发票","type":1,"entityCode":1076,"outLink":"","guid":"bb5bac7c2dba4176b5c165ae68e3f085","parentGuid":"4e71a2c2e49b4605afc711bf493f1abb","isOpeneds":false,"useIcon":"el-icon-wallet","iconColor":"","entityName":"Jinxiangfapiao"},{"name":"付款单","type":1,"entityCode":1077,"outLink":"","guid":"cf1af4bd27ee4d288acf74448b1eeada","parentGuid":"4e71a2c2e49b4605afc711bf493f1abb","isOpeneds":false,"useIcon":"el-icon-document-checked","iconColor":"","entityName":"Fukuandan"}],"entityName":"parentMenu"},{"name":"aaaa","type":2,"entityCode":null,"outLink":"/web/dashboard?chartId=0000052-58eaf6c924ed4d2b877d6f8e095a0f0a","openType":0,"guid":"ae17b04483c647579cec6d0c2269c031","parentGuid":"","isOpeneds":false,"useIcon":"","iconColor":""}]',
  //     },
  //   ],
  // };
}

/**
 * 获取实体布局配置
 *
 * yao run scripts.layout.getLayoutList 'Entity1'
 * @param {*} entityName
 * @returns
 */
function getLayoutList(entityName) {
  const [entity] = Process("models.sys.entity.get", {
    wheres: [{ column: "name", value: entityName }],
    withs: {
      fieldSet: {},
    },
  });

  if (!entity) {
    throw Error(`Entity:${entityName} not exist`);
  }
  loadEntityToYao("LayoutConfig");
  const entityLayoutConfig = getEntityByName("LayoutConfig");

  let [layoutAllListConfig] = Process("models.layoutconfig.get", {
    wheres: [
      {
        column: "shareTo",
        value: "ALL",
      },
      {
        column: "applyType",
        value: "LIST",
      },
      {
        column: "entityCode",
        value: entity.entityCode,
      },
    ],
  });
  let [layoutSelfListConfig] = Process("models.layoutconfig.get", {
    wheres: [
      {
        column: "shareTo",
        value: "SELF",
      },
      {
        column: "applyType",
        value: "LIST",
      },
      {
        column: "entityCode",
        value: entity.entityCode,
      },
    ],
  });

  const fields = entity.fieldSet.map((field) => {
    return {
      isUpdatable: field.updatable,
      fieldName: field.name,
      isNameField: field.nameFieldFlag,
      fieldLabel: field.label,
      isNullable: field.nullable,
      isCreatable: field.creatable,
      fieldType: field.type,
      referenceName: field.referTo?.replace(",", ""),
    };
  });
  if (!layoutSelfListConfig) {
    layoutSelfListConfig = {
      applyType: "LIST",
      entityCode: entity.entityCode,
      shareTo: "SELF",
      config: JSON.stringify(fields),
    };
  } else {
    layoutSelfListConfig.layoutConfigId = `${entityLayoutConfig.entityCode}-${layoutSelfListConfig.layoutConfigId}`;
  }
  if (!layoutAllListConfig) {
    layoutAllListConfig = {
      applyType: "LIST",
      entityCode: entity.entityCode,
      shareTo: "ALL",
      config: JSON.stringify(fields),
    };
  } else {
    layoutAllListConfig.layoutConfigId = `${entityLayoutConfig.entityCode}-${layoutAllListConfig.layoutConfigId}`;
  }

  return {
    FILTER: [],
    nameFieldName: entity.idFieldName,
    titleWidthForSelf: null,
    quickFilterLabel: "",
    chosenListType: null,
    advFilter: null,
    idFieldName: entity.idFieldName,
    LIST: {
      ALL: layoutAllListConfig,
      SELF: layoutSelfListConfig,
      titleWidthForAll: null, //JSON.stringify(fieldsTitle),
    },
  };
}
/**
 * 创建或是更新布局配置
 * @param {string|null} recordId
 * @param {string} applyType
 * @param {*} formModel
 */
function saveConfig(recordId, applyType2, formData) {
  const entityLayoutConfig = getEntityByName("LayoutConfig");

  console.log("recordId:", recordId);
  let idstr = recordId;
  if (!recordId) {
    // 新建
    idstr = null;
  }

  if (recordId) {
    if (recordId.includes("-")) {
      const [layoutEntityCode, confiId] = recordId.split("-");
      if (layoutEntityCode != entityLayoutConfig.entityCode) {
        throw Error(
          `不正确的布局ID:${layoutEntityCode},期望是：${entityLayoutConfig.entityCode}`
        );
      }
    } else {
      idstr = entityLayoutConfig.entityCode + "-" + recordId;
    }
  }
  // applyType=LIST 列表设计
  let { applyType, config, entityCode, shareTo, configName } = formData;
  if (!applyType) {
    applyType = applyType2;
  }
  if (!applyType) {
    throw Error(`需要填写布局配置类型`);
  }

  loadEntityToYao("LayoutConfig");
  // 自定义列表显示，shareTo = SELF
  // 默认列表显示，shareTo = ALL
  // const [layoutConfig] = Process("models.layoutconfig.get", {
  //   wheres: [
  //     {
  //       column: "shareTo",
  //       value: shareTo,
  //     },
  //     {
  //       column: "applyType",
  //       value: applyType,
  //     },
  //     {
  //       column: "entityCode",
  //       value: entityCode,
  //     },
  //   ],
  // });
  // let idstr = null;
  // if (layoutConfig?.layoutConfigId) {
  //   idstr = entityCode + "-" + layoutConfig?.layoutConfigId;
  // }
  const configId = Process("scripts.curd.saveRecord", "LayoutConfig", idstr, {
    configName,
    config,
    applyType,
    entityCode,
    shareTo,
  });
  return {
    formData: {
      layoutConfigId: configId,
      configName,
      config,
      applyType,
      entityCode,
      shareTo,
    },
  };
  // formModel = {"config":"[{\"isUpdatable\":false,\"fieldName\":\"yonghuId\",\"isNameField\":false,\"fieldLabel\":\"id主键\",\"isNullable\":false,\"isCreatable\":false,\"fieldType\":\"PrimaryKey\"},{\"isUpdatable\":false,\"fieldName\":\"createdOn\",\"isNameField\":false,\"fieldLabel\":\"创建时间\",\"isNullable\":false,\"isCreatable\":false,\"fieldType\":\"DateTime\"},{\"isUpdatable\":false,\"fieldName\":\"createdBy\",\"isNameField\":false,\"fieldLabel\":\"创建用户\",\"isNullable\":false,\"isCreatable\":false,\"fieldType\":\"Reference\",\"referenceName\":\"User\"},{\"isUpdatable\":false,\"fieldName\":\"modifiedBy\",\"isNameField\":false,\"fieldLabel\":\"修改用户\",\"isNullable\":false,\"isCreatable\":false,\"fieldType\":\"Reference\",\"referenceName\":\"User\"},{\"isUpdatable\":false,\"fieldName\":\"modifiedOn\",\"isNameField\":false,\"fieldLabel\":\"最近修改时间\",\"isNullable\":false,\"isCreatable\":false,\"fieldType\":\"DateTime\"}]","entityCode":1532,"applyType":"LIST","shareTo":"ALL"}
  // return `${entityLayoutConfig.entityCode}-${configId}`;
}

// 切换使用导航
function saveUserLayoutCache(cacheKey, cacheValue) {
  // cacheKey=LIST:TestUser&cacheValue=ALL
  // cacheKey=LIST:TestUser&cacheValue=SELF
  // Process("session.")
}
// 删除布局配置
function deleteConfig(recordId) {
  loadEntityToYao("LayoutConfig");
  Process("models.layoutconfig.delete",recordId)
}

// 数据导出
function excelDataExcel(formModel) {}
