import React from 'react';
import uuid from 'uuid';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
let arr = [
{
	key: uuid.v4(),
	left: 100,
	top:50,
},
{
	key: uuid.v4(),
	left: 400,
	top:80,
},
{
	key: uuid.v4(),
	left: 800,
	top:110,
}];
let obj = {};
arr.forEach(v=>{
	obj[v.key] = {
		left:v.left,
		top: v.top,
	}
})
class  App extends  React.Component {
	constructor(props) {
		super(props);
		this.state = {obj};
	}
	change(){
		[arr[0], arr[1]] = [arr[1], arr[0]];
		arr.forEach((v,i)=>{
		obj[v.key] = {
				left:v.left/(i+1),
				top: v.top,
			}
		})
		this.setState({obj});
	}
	render(){
		let temp = [];
		for(let k in this.state.obj){

			let n = this.state.obj[k];
			let style = {
				position: 'absolute',
				left: n.left,
				top: n.top,
			}
			temp.push(<h3 className = 'cancel-unit' style = {style} key={k}>{k}</h3>)
		}
		return (<div>
					<button onClick={this.change.bind(this)}>change</button>
						{temp}					
				</div>)
	}
}

const render = (Component) => {
	ReactDom.render(
		<AppContainer>
			<App />
		</AppContainer>, document.getElementById('root')
		)
}
render(App);
if(module.hot) {
	module.hot.accept('./simple', () => render(App))
}