import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/constants'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from'react-redux'
import { addBill } from '@/store/modules/bill'
import { useState } from'react'
import dayjs from 'dayjs'

const New = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [curType, setCurType] = useState('pay')
  const [curUseFor, setCurUseFor ] = useState('')
  const [curMoney, setCurMoney] = useState('')
  const nowDate = dayjs(new Date()).format('YYYY-MM-DD')
  const [curDate, setcurDate] = useState(nowDate)

  const handleDateConfirm = date => {
    setcurDate(dayjs(date).format('YYYY-MM-DD'))
    setVisible(false)
  }

  const handleSave = () => {
    if (!curMoney || !curUseFor) return

    dispatch(addBill({
      type: curType,
      useFor: curUseFor,
      date: curDate,
      money: curType === 'pay' ? -curMoney : +curMoney
    }))
    navigate('/')
  }

  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames({selected: curType === 'pay'})}
            onClick={() => setCurType('pay')}
          >
            支出
          </Button>
          <Button
            className={classNames({selected: curType === 'income'})}
            shape="rounded"
            onClick={() => setCurType('income')}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date" onClick={() => setVisible(true)} >
              <Icon type="calendar" className="icon" />
              <span className="text">{curDate === nowDate ? '今天' : curDate}</span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
                visible={visible}
                onCancel={() => setVisible(false)}
                onConfirm={handleDateConfirm}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={curMoney}
                onChange={money => setCurMoney(money)}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[curType].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={classNames(
                        'item',
                        {selected: curUseFor === item.type}
                      )}
                      key={item.type}
                      onClick={() => setCurUseFor(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={handleSave}>
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New