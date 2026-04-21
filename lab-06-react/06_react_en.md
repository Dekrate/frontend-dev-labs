# Laboratory 06

## Task 1
Class components – Padel shopping list
Create a React app using class components to manage a list of padel equipment.
### STEP BY STEP:
1.    Create a class component called  ShoppingList  with a  state  (shopping list)
2.    Add an  addItem  method – adds a new item to the list
3.	Add a  removeItem  method – removes the item by  id 
3.    Add a  toggleBought  method – toggles the “bought” status
4.    Create a  ShoppingItem  component (represents a single item)
5.    Use  this.setState  with an updater function (do not mutate the state directly)
#### Data structure:
```js
const items = [
  { id: 1, name: "Wilson Blade racket", bought: false, price: 799 },
  { id: 2, name: "Head bag", bought: true, price: 299 }
]
```
#### Interface requirements:
```
📋 Padel shopping list (3/5 purchased)
☐ Wilson Blade racket – 799 PLN [REMOVE]
☑ Head bag – 299 PLN [REMOVE]  
☐ Head balls – 49 PLN [REMOVE]
[+ Add new item]
```

#### Must be used:
•	class Component extends React.Component 
•	this.state = { items: [] } 
•	this.setState(updaterFunction) 
•	Event handlers as class methods:  handleAddItem = () => { ... } 
•   Keywords:  constructor ,  render() ,  super(props)

## Task 2
Functional hooks – Padel statistics calculator
Create a React application using hooks to calculate padel player statistics.
### STEP BY STEP:
1.    Create a functional component called  PadelStats  using  useState 
2.    Add 3 states:  matches ,  wins ,  elo 
3.    Use  useState  for the form (new match)
4.	Create the  addMatch  function – adds a match and updates the ELO
4.    Use  useEffect  to automatically recalculate the win rate
5.    Create the  MatchForm  component (match addition form)
#### Interface requirements:
```
🏓 Marcin Borowski - ELO: 1567
Matches: 124 | Wins: 47 | Win rate: 37.9%

📊 Last match:
Opponent: [Jan K.] | Result: [Win] [ADD]
```
#### Must be used:
•	const matches, setMatches = useState(0) 
•	useEffect(() => { calculateWinrate() }, wins, matches) 
•	Event handlers as functions within a component
•  Destructuring props:  function MatchForm({ onAddMatch }) 
•  Key terms:  useState ,  useEffect , arrow functions


---
## EXAMPLE SOLUTIONS

### Task 1: ShoppingList (Class)
```tsx
class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
    this.handleAddItem = this.handleAddItem.bind(this);
  }

  handleAddItem(name) {
    this.setState(prevState => ({
      items: [...prevState.items, { id: Date.now(), name, bought: false }]
    }));
  }

  render() {
    return (
      <div>
        {this.state.items.map(item => (
          <ShoppingItem key={item.id} item={item} />
        ))}
      </div>
    );
  }
}
```

### Task 2: PadelStats (Hooki)
```tsx
function PadelStats() {
  const [matches, setMatches] = useState(0);
  const [wins, setWins] = useState(0);
  
  const winrate = matches > 0 ? Math.round((wins / matches) * 100) : 0;

  useEffect(() => {
    // Automatic ELO conversion based on win rate
  }, [wins, matches]);

  return <div>ELO: {elo}</div>;
}
```
