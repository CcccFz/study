import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

const BarChart = ({ title }) => {
  const ref = useRef(null)

  useEffect(() => {
    const chart = echarts.init(ref.current)

    const option = {
      title: {
        text: title
      },
      xAxis: {
        type: 'category',
        data: ['Vue', 'Angular', 'React']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'bar',
          data: [180, 80, 210]
        }
      ]
    }

    chart.setOption(option)
  }, [title])

  return <div className='main' ref={ref} style={{ width: '500px', height: '400px' }} ></div>
}

export default BarChart
