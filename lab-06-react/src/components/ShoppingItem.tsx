import './ShoppingItem.css'

interface Item {
  id: number
  name: string
  bought: boolean
  price: number
}

interface Props {
  item: Item
  onToggle: () => void
  onRemove: () => void
}

function ShoppingItem({ item, onToggle, onRemove }: Props) {
  return (
    <div className={`shopping-item ${item.bought ? 'bought' : ''}`}>
      <button className="toggle-btn" onClick={onToggle}>
        {item.bought ? '☑' : '☐'}
      </button>
      <span className="item-name">{item.name}</span>
      <span className="item-price">{item.price} PLN</span>
      <button className="remove-btn" onClick={onRemove}>
        REMOVE
      </button>
    </div>
  )
}

export default ShoppingItem
