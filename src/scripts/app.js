import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

let appContainerEl = document.querySelector('#app-container')

const ProfileList = React.createClass({

 render: function(){

//////Thanks, Caleb/////////
   let arrOfElements = this.props.congressObj.map(function(el){
     return <SingleProfile singleLegislator={el}/>
   })
///////////////////////////
  return (
     <div className="row">
      {arrOfElements}
    </div>
   )
 }
})

const SingleProfile = React.createClass({

  _isDefined: function(someValue){
    if(someValue === null || someValue === undefined){
      return "undefined"
    }else{
      return someValue
    }
  },

  _createCongressJSX: function(eachObj){
      return (
        <div className="col-xs-12 col-sm-4 single-rep" data-bioid={eachObj.bioguide_id}>
          <h3>{eachObj.first_name} {eachObj.last_name}</h3>
          <h4><strong>{eachObj.title} --- {eachObj.party}-{eachObj.state}</strong></h4>
          <ul className="social">
            <li>{this._isDefined(eachObj.oc_email)}</li>
            <li>{this._isDefined(eachObj.website)}</li>
            <li>{this._isDefined(eachObj.facebook_id)}</li>
            <li>{this._isDefined(eachObj.twitter_id)}</li>
          </ul>
          <p>Term End{eachObj.term_end}</p>
        </div>
        )
      },

  render: function(){
    let congressList = this.props.singleLegislator;
    return ( this._createCongressJSX(congressList) )
  }
})


$.getJSON("https://congress.api.sunlightfoundation.com/legislators?callback=?").then(function(serverRes){
  let legislatorData = serverRes.results
  ReactDOM.render( <ProfileList congressObj={legislatorData}/> , appContainerEl);
})
