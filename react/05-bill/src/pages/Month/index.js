import { NavBar, DatePicker } from "antd-mobile"
import { useSelector } from "react-redux"
import { useMemo, useState } from "react"
import _ from "lodash"
import classNames  from 'classnames'
import dayjs from "dayjs"
import './index.scss'
import DailyBill from "./components/DailyBill"

const Month = () => {
  const { bills } = useSelector(state => state.bill)
  const [ dateVisible, setDateVisible ] = useState(false)
  const [ curDate, setCurDate ] = useState(dayjs(new Date()).format('YYYY-MM'))

  const biilsByMonth = useMemo(() => _.groupBy(bills, bill => dayjs(bill.date).format('YYYY-MM')), [bills])
  const biilsByDay = useMemo(() => _.groupBy(biilsByMonth[curDate], bill => dayjs(bill.date).format('MM-DD')), [biilsByMonth, curDate])
  const amount = useMemo(() => calcAmount(biilsByMonth[curDate]), [biilsByMonth, curDate])

  function calcAmount(bills) {
    const amount = {pay: 0, income: 0, balance: 0}
    if (!bills) return amount
    amount.pay = bills.filter(bill => bill.type === 'pay').reduce((acc, cur) => acc + cur.money, 0)
    amount.income = bills.filter(bill => bill.type === 'income').reduce((acc, cur) => acc + cur.money, 0)
    amount.balance = amount.income+amount.pay
    return amount
  }

  const handleDateConfirm = (date) => {
    setDateVisible(false)
    setCurDate(dayjs(date).format('YYYY-MM'))
  }

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date">
            <span className="text">
              {curDate.replace('-', ' | ')}月账单
            </span>
            <span className={classNames('arrow', {expand: dateVisible} )} onClick={() => setDateVisible(true)}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{amount.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{amount.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{amount.balance.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>

          
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            onCancel={() => setDateVisible(false)}
            onClose={() => setDateVisible(false)}
            onConfirm={handleDateConfirm}
            max={new Date()}
          />
        </div>

        {Object.keys(biilsByDay).map(
          date => <DailyBill
            key={date}
            date={date}
            bills={biilsByDay[date]}
            calcAmount={calcAmount}
          />
        )}
      </div>
    </div >
  )
}

export default Month