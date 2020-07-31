let echartsConfig = {}
let color=['#37a2da','#67e0e3','#ffdb5c','#ff9f7f','#e062ae','#ea6a6a','#97c979','#fb8d34','#feebae','#fdcf84','#48b788','#9f4ef4','#7894ea',];

echartsConfig.lineChartOption = function (xLables,datas,labelColor,lineColor) {
  let option = {
       backgroundColor: 'transparent',
       tooltip: {
           trigger: 'axis'
       },
       grid: {
                  left: '3%',
                  right: '3%',
                  bottom: '3%',
                  top:'10%',
                  containLabel: true
              },

              yAxis: [
                  {
                      type: 'value',
                      position: 'right',
                      splitLine: {
                          show: false
                      }
                      ,
                      axisLine: {
                          show: false
                      },
                      axisTick: {
                          show: false
                      },
                      axisLabel: {
                          show: false
                      }
                  },

                  {
                      type: 'value',
                      position: 'left',
                      nameTextStyle: {
                          color: '#999999'
                      },
                      splitLine: {
                          lineStyle: {
                              type: 'dashed',
                              color: 'rgba(135,140,147,0.8)'
                          }
                      },
                      axisLine: {
                          show: false
                      },
                      axisTick: {
                          show: false
                      },
                      axisLabel: {
                          color: '#333',
                          fontSize: 12
                      }
                  },
              ],
              xAxis: [
                  {
                      type: 'category',
                      axisTick: {
                          show: true,
                          alignWithLabel: true,
                          interval:datas.length>15?2:0,
                      },
                      axisLine: {
                          show: true,
                          lineStyle: {
                              color: lineColor==undefined?'#0696f9':lineColor,
                          }
                      },
                      axisLabel: {
                          inside: false,

                          //rotate:38,
                          textStyle: {
                              color: labelColor==undefined?'#fff':labelColor,// x轴颜色
                              fontWeight: 'normal',
                              fontSize: '10',
                              lineHeight: 22
                          }

                      },
                      data: xLables,
                  },
              ],
              series: datas,
  };
  return option;
}

echartsConfig.smoothLineChartOption=function(legend,xdatas,ydatas,color){
  var option = {
        color:color,
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: legend,
            orient: 'vertical',
            right: 10,
            bottom:20,
        },
        grid: {
            left: 30,
            right: legend.length>0?150: 30,
            bottom: 10,
            top:30,
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLabel:{
              color:"#999999",
              interval:xdatas.length>15?2:0,
            },
            axisLine:{
              lineStyle:{
                color:"#999999",
              },
            },
            data: xdatas
        },
        yAxis: {
            type: 'value',
            axisLine:{
              show:false,
            },
             axisTick:{
               show:false,
             },
             splitLine:{
               show:true,
               lineStyle:{
                 type:'dashed',
               },
             },
        },
        series:ydatas
    };

    return option;
}

echartsConfig.pieChartOption = function (name,data) {
  let option = {
        color:color,
        backgroundColor: 'transparent',
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
         },
        legend: {
            data: data,
            textStyle:{color:'white'},
            left:'5%',
            top:'5%',
        },
        animation:true,
        series : [
            {
                name: name,
                type: 'pie',
                radius: '55%',
                center: ['45%', '50%'],
                data:data,
                label: { normal: { show: false, position: 'inner' }},
                itemStyle:{opacity:0.9,},
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.8)'
                    }
                },
            }
        ]
  };
  return option;
}

echartsConfig.annularChartOption = function (datas,colors,lagend,center,radius,label) {
  let option = {
        color:colors.length==0?color:colors,
        tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
        },
        legend:lagend==undefined? {
            bottom: 10,
            left: 'center',
            icon:'circle',
            textStyle:{
              color:"#999999",
              fontSize:10,
            }
        }:lagend,
        series: [
            {
                name:'',
                type: 'pie',
                radius:radius==undefined? ['30%', '80%']:radius,
                center: center!=undefined?center:['50%', '40%'],
                selectedMode: 'single',
                data: datas,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label:label==undefined?{
                  formatter: '{d}%',
                  color:"#666666",
                }:label,
            }
        ]
  };
  return option;
}


echartsConfig.barChartOption = function (names,datas,colors) {
  let option = {
        color: colors.length==0?color:colors,
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: 20,
            right: 20,
            bottom: 10,
            top:30,
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: names,
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel:{
                  color:"#999999",
                  interval:names.length>15?2:0,
                  fontSize:10,
                },
                axisLine:{
                  lineStyle:{
                    color:"#999999",
                  },
                },
            }
        ],
        yAxis: [
            {
                type: 'value',
                 axisLine:{
                   show:false,
                 },
                  axisTick:{
                    show:false,
                  },
                  splitLine:{
                    show:true,
                    lineStyle:{
                      type:'dashed',
                    },
                  },
            }
        ],
        series: [
            {
                name: '',
                type: 'bar',
                barWidth: '60%',
                data: datas
            }
        ]
  };
  return option;
}

/**
 * @param {Object} names
 * @param {Object} datas
 * @param {Object} colors
 * {
            name: '直接访问',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'insideRight'
            },
            data: [320, 302, 301, 334, 390, 330, 320]
        },
 */
echartsConfig.horizontalBarChartOption = function (legend,names,datas,colors) {
  let option = {
      color:colors.length==0?color:colors,
      tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
      },
      legend:legend,
      grid: {
          left: 20,
          right: legend.show?100:20,
          bottom: 10,
          top:20,
          containLabel: true
      },
      xAxis: {
          type: 'value',
          axisTick:{
            show:false,
          },
          axisLabel:{
            color:"#999999",
            interval:names.length>15?2:0,
            fontSize:10,
          },
          axisLine:{
            lineStyle:{
              color:"#999999",
            },
          },
      },
      yAxis: {
          type: 'category',
          data: names,
          axisLabel:{
            color:"#999999",
            fontSize:12,
          },
          axisLine:{
            lineStyle:{
              color:"#999999",
            },
          },

      },
      series:datas
    };


  return option;
}

export default echartsConfig
