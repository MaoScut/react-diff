//为了看看key属性到底怎么运作，写个简单的组件
import React from 'react';
import uuid from 'uuid';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
require('./main.css');
let arr = [
{
	key: uuid.v4(),
	
	left: 300,
	// top:50,
	originIndex: 0,
	className: 'myclass50',
},
{
	key: uuid.v4(),
	left: 300,
	// top:100,
	originIndex: 1,
	className: 'myclass100',
},
{
	key: uuid.v4(),
	left: 300,
	// top:150,
	originIndex: 2,
	className: 'myclass150',
}];
// let obj = {};
// arr.forEach(v=>{
// 	obj[v.key] = {
// 		left:v.left,
// 		top: v.top,
// 	}
// })
const AppId = uuid.v4();
class  App extends  React.Component {
	constructor(props) {
		super(props);
		this.state = {arr};
	}
	change(){
		console.log('emit change event');
		[arr[0], arr[1]] = [arr[1], arr[0]];
		arr.forEach((v,i)=>v.className = 'myclass' + (50 * i + 50));
		// if do as follow, just one element has animation(but if you set a break point both have)
		// this.setState({arr});
		
		// this statement give result I expect!
		// so it seems that no only key, but also the squence of the element have influence on render method.
		this.setState({arr: arr.slice().sort((v1, v2) => v1.originIndex - v2.originIndex)});

		// [arr[0].className, arr[1].className] = [arr[1].className, arr[0].className];
		
		// arr[0].className = 'myclass100';
		// arr[1].className = 'myclass50';
		// arr[0].top += 50;
		// this.setState({
		// 	obj,
		// 	b: 1
		// },()=>{
		// 	console.log('should be 1, in fact it is ' + this.state.b)
		// 	this.setState({
		// 		b: 2
		// 	}, () => console.log('should be 2, in fact it is ' + this.state.b))
		// });
	}
	render(){
		let temp = [];
		for(let k in this.state.arr){

			let n = this.state.arr[k];
			let style = {
				position: 'absolute',
				left: n.left,
				// top: n.top,
			}
			temp.push(<h3 className = {'cancel-unit ' + n.className} style = {style} key={n.key}>{n.originIndex}</h3>)
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
			<App key={AppId}/>
		</AppContainer>, document.getElementById('root')
		)
}
render(App);
if(module.hot) {
	module.hot.accept('./index.jsx', () => render(App))
}