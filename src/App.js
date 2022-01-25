import Geolocation from '@react-native-community/geolocation';
import React, { Component,useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-maps';


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      latitude:0,
      longitude:0,
      marginBottom:1
    }
  }

  componentDidMount(){
    Geolocation.getCurrentPosition(data=>{
      this.setState({latitude:data.coords.latitude})
      this.setState({longitude:data.coords.longitude})
    })
  }



  render() {
    return (
      <View style={styles.body}>
        <View style={styles.container}>
        <Text style={{color:'#ffffff',marginTop:10,fontSize:20}}>Welcome To Google Map</Text>
        </View>
       <MapView
       style={[styles.map,{marginBottom:this.state.marginBottom}]}
       initialRegion={{
         latitude: this.state.latitude,
         longitude: this.state.longitude,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421,
       }}
       showsUserLocation={true}
       showsMyLocationButton={true}
       onMapReady={()=>{this.setState({marginBottom:0})}}
       onPress={(e)=>{this.setState({latitude:e.nativeEvent.coordinate.latitude,longitude:e.nativeEvent.coordinate.longitude})}}
      onRegionChangeComplete={(region) => this.setState({latitude:region.latitude,longitude:region.longitude})}
     >
       <Marker coordinate={this.state}
        image={require('../assets/cutom_location.png')}/>
     </MapView>
     </View>
    );
  }
}


const styles=StyleSheet.create({
  body:{
    flex:1,
    alignItems:'center',
  },
  container:{
    width:'100%',
    height:50,
    alignItems:'center',
    alignSelf:'center',
    backgroundColor:'#0f2fff'
  },
  map:{
    width:'100%',
    height:'100%',
  },

})
