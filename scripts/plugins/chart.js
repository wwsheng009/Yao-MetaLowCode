function queryChartData(payload) {
  // 需要根据查询的数据，生成一个echart的配置图形
  payload = {
    // 图表类型
    chartType: "pie",
    // 实体名称
    entityName: "Baojiadanchanpinmingxi",
    // 维度
    latitude: [{ fieldName: "createdOn", label: "创建时间", sort: "" }],
    // 指标
    longitude: [
      {
        fieldName: "xiaoshoushuliang",
        label: "销售数量",
        sort: "",
        calcMode: "count",
        axisFormat: {
          thousandsSeparator: false,
          decimalPlaces: 0,
          numericUnits: "",
        },
      },
    ],
    noPrivileges: true,
    // 数据筛选条件
    filter: { equation: "OR", items: [] },
  };

  return {
    yAxis: ["销售原价总额(含税)/元"],
    xAxis: ["2024-01-01"],
    series: [
      {
        data: ["1"],
        name: "销售原价总额(含税)/元",
      },
    ],
  };
}
function updateDefault(idStr, defaultChart) {
  // /plugins/metaDataCube/chart/updateDefault?id=52-1&defaultChart=true
  const [entityCode, id] = idStr.split("-");

  // 如果是真，需要把其它的关闭掉。
  if (defaultChart) {
    Process(
      "models.chart.updatewhere",
      {
        wheres: [
          {
            column: "defaultChart",
            value: true,
          },
        ],
      },
      {
        defaultChart: false,
      }
    );
  }

  Process("models.chart.update", id, {
    defaultChart,
  });
}
