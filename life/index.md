# Life


{{< echarts >}}

{
  
  "timeline": {
    "left": 50,
    "top": 20,
    "bottom": 20,
    "width": 100,
    "axisType": "category",
    "orient": "vertical",
    "inverse": true,
    "autoPlay": false,
    "controlStyle": {
      "show": false
    },
    "label": {
      "position": "right",
      "formatter": "{date|{value}}\n{event|{eventText}}",
      "rich": {
        "date": {
          "color": "#999",
          "fontSize": 12,
          "lineHeight": 18
        },
        "event": {
          "fontWeight": "bold",
          "fontSize": 14,
          "lineHeight": 20
        }
      }
    },
    "symbol": "circle",
    "symbolSize": 12,
    "data": [
      {
        "value": "2021-01-01",
        "eventText": "新年\u2003庆祝活动开始",
        "itemStyle": {
          "color": "#e74c3c"
        }
      },
      {
        "value": "2021-02-14",
        "eventText": "情人节\u2003发送贺卡和花束",
        "itemStyle": {
          "color": "#9b59b6"
        }
      },
      {
        "value": "2021-03-08",
        "eventText": "国际妇女节\u2003表彰女性贡献",
        "itemStyle": {
          "color": "#3498db"
        }
      }
    ]
  },
  "options": [
    {
      "series": []
    }
  ]
}


{{< /echarts >}}











