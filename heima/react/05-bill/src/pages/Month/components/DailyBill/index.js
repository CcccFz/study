import classNames from 'classnames'
import './index.scss'
import { billTypeToName } from '@/constants'
import Icon from '@/components/Icon'
import { useState } from 'react'

const DailyBill = ({ date, bills, calcAmount }) => {
  const amount = calcAmount(bills)
  const [ visible, setVisible ] = useState(false)

  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date.replace('-', '月')}日</span>
          <span className={classNames('arrow', {expand: visible})} onClick={() => setVisible(!visible)}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{amount.pay.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{amount.income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{amount.balance.toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
      <div className="billList" style={{ display: visible? 'block' : 'none' }}>
        {bills.map(bill => (
          <div className="bill" key={bill.id}>
            <Icon type={bill.useFor}/>
            <div className="detail">              
              <div className="billType">{billTypeToName[bill.useFor]}</div>
            </div>
            <div className={classNames('money', bill.type)}>
              {bill.money.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default DailyBill