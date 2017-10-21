@extends('layouts.master')

@section('title', 'Lokerjawabatam')

@section('content')
    <script type="text/babel">
        var retr_dec = function(num){
            return (num.split('.')[1] || []).length
        }

        var rounding_item = function(){

        }

        var SplitItem = React.createClass({
            getInitialState: function(){
                return{
                    percentage: null,
                    qty: null,
                    price: null,
                    splitNumber: null,
                    splitValues: [],
                    total: null
                }
            },
            onChangePercentage: function(event){
                this.setState({
                    percentage: event.target.value
                })
            },
            onChangeQuantity: function(event){
                this.setState({
                    qty: event.target.value
                })  
            },
            onChangePrice: function(event){
                this.setState({
                    price: event.target.value
                })
            },
            onChangeSplitNumber: function(event){
                this.setState({
                    splitNumber: event.target.value
                })
            },
            onClickSplit: function(){
                let percentage = Number(this.state.percentage)
                var qty = Number(this.state.qty)
                let price = Number(this.state.price)
                var splitValues = this.state.splitValues
                let splitNumber = Number(this.state.splitNumber)
                var totValues = 0
                var total = 0
                var avg = percentage / splitNumber
                let decDig = retr_dec(avg.toString())
                var rond = decDig >= 2 ? 2 : decDig 
                var margin = 0

                for(var i = 0; i < splitNumber; i++){
                    totValues += Number(avg.toFixed(rond))
                    
                    splitValues.push({
                        val: Number(avg.toFixed(rond)),
                        qty: qty,
                        price: price,
                        extPrice: qty * price
                    })
                }
                
                margin = Number((percentage - totValues).toFixed(rond))
                
                _.each(splitValues, function(_item){
                    if (margin != 0){
                        if(margin < 0){
                            _item.val = Number((_item.val - 0.01).toFixed(rond))
                            margin = Number((margin + 0.01).toFixed(rond))
                        }else{
                            _item.val = Number((_item.val + 0.01).toFixed(rond))
                            margin = Number((margin - 0.01).toFixed(rond))
                        }
                    }

                    _item.qty = Number(qty * (_item.val / 100))
                    _item.extPrice = Number((_item.qty * _item.price).toFixed(2))
                    total = Number((total + _item.val).toFixed(rond))
                })

                this.setState({
                    splitValues: splitValues,
                    total: total
                })

            },
            render: function(){
                let percentage = this.state.percentage
                let qty = Number(this.state.qty)
                let price = Number(this.state.price)
                let splitNumber = Number(this.state.splitNumber)
                let splitValues = this.state.splitValues
                let extPrice = Number((qty * price).toFixed(2))
                let total = this.state.total

                return(
                    <div>
                        <div className="row">
                            <div className="form-group">
                                <div className="col-sm-3"></div>
                                <label className="col-sm-2"> percentage :</label>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control" value={percentage} onChange={this.onChangePercentage} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-3"></div>
                                <label className="col-sm-2"> quantity :</label>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control" value={qty} onChange={this.onChangeQuantity} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-3"></div>
                                <label className="col-sm-2"> price :</label>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control" value={price} onChange={this.onChangePrice} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-3"></div>
                                <label className="col-sm-2"> ext price :</label>
                                <div className="col-sm-6">
                                    <label>{extPrice}</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-3"></div>
                                <label className="col-sm-2"> Number of Split :</label>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control" value={splitNumber} onChange={this.onChangeSplitNumber} />
                                </div>
                            </div>
                            <div>
                                <button className="btn btn-success btn-md" onClick={this.onClickSplit}>Split Item</button>
                            </div>
                        </div>
                        <div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>value</th>
                                        <th>qty</th>
                                        <th>price</th>
                                        <th>ext price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        splitValues.map(function(item, key){
                                            return(
                                                <tr>
                                                    <td>{item.val}</td>
                                                    <td>{item.qty}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.extPrice}</td>
                                                </tr>
                                            )
                                        })      
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div> total values : {total}</div>
                    </div>
                )
            }
        })

        ReactDOM.render(
            <SplitItem />,
            document.getElementById('content')
          );
    </script>
@endsection