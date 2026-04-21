import React from 'react'
import ShoppingItem from './ShoppingItem'
import './ShoppingList.css'

interface Item {
  id: number
  name: string
  bought: boolean
  price: number
}

interface State {
  items: Item[]
  newItemName: string
  newItemPrice: string
}

class ShoppingList extends React.Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props)
    this.state = {
      items: [
        { id: 1, name: 'Wilson Blade racket', bought: false, price: 799 },
        { id: 2, name: 'Head bag', bought: true, price: 299 },
        { id: 3, name: 'Head balls', bought: false, price: 49 },
        { id: 4, name: 'Babolat shoes', bought: false, price: 459 },
        { id: 5, name: 'Overgrip pack', bought: false, price: 29 },
      ],
      newItemName: '',
      newItemPrice: '',
    }
  }

  handleAddItem = () => {
    const { newItemName, newItemPrice } = this.state
    if (!newItemName.trim()) return

    const price = parseFloat(newItemPrice) || 0

    this.setState((prevState) => ({
      items: [
        ...prevState.items,
        {
          id: Date.now(),
          name: newItemName,
          bought: false,
          price,
        },
      ],
      newItemName: '',
      newItemPrice: '',
    }))
  }

  handleRemoveItem = (id: number) => {
    this.setState((prevState) => ({
      items: prevState.items.filter((item) => item.id !== id),
    }))
  }

  handleToggleBought = (id: number) => {
    this.setState((prevState) => ({
      items: prevState.items.map((item) =>
        item.id === id ? { ...item, bought: !item.bought } : item
      ),
    }))
  }

  handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newItemName: e.target.value })
  }

  handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newItemPrice: e.target.value })
  }

  render() {
    const { items, newItemName, newItemPrice } = this.state
    const boughtCount = items.filter((item) => item.bought).length

    return (
      <div className="section">
        <h2>
          Padel shopping list ({boughtCount}/{items.length} purchased)
        </h2>
        <div className="shopping-list">
          {items.map((item) => (
            <ShoppingItem
              key={item.id}
              item={item}
              onToggle={() => this.handleToggleBought(item.id)}
              onRemove={() => this.handleRemoveItem(item.id)}
            />
          ))}
        </div>
        <div className="add-item-form">
          <input
            type="text"
            placeholder="Item name"
            value={newItemName}
            onChange={this.handleNameChange}
          />
          <input
            type="number"
            placeholder="Price"
            value={newItemPrice}
            onChange={this.handlePriceChange}
          />
          <button onClick={this.handleAddItem}>+ Add new item</button>
        </div>
      </div>
    )
  }
}

export default ShoppingList
