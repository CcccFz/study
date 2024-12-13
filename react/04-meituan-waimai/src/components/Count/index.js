import './index.scss'

const Count = ({ count, handleMinus, handlePlus }) => {
  return (
    <div className="goods-count">
      <span className="minus" onClick={handleMinus}>-</span>
      <span className="count">{count}</span>
      <span className="plus" onClick={handlePlus}>+</span>
    </div>
  )
}

export default Count
