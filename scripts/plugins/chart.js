function queryChartData(payload) {
  payload = {
    chartType: "pie",
    entityName: "Baojiadanchanpinmingxi",
    latitude: [{ fieldName: "createdOn", label: "创建时间", sort: "" }],
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
