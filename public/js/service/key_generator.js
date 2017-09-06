class KeyGenerator {
  getUniqueKey(){
    if (this.lastTimestamp != null || this.lastTimestamp == undefined){
      this.lastTimestamp = this.lastTimestamp
    }else{
      this.lastTimestamp == 0
    }

    let timestamp = null
    
    if (window.performance && window.performance.now){
      timestamp = parseInt(window.performance.now() * 1000000)
      if (timestamp <= this.lastTimestamp){
        timestamp = this.lastTimestamp + 1
      }
      this.lastTimestamp = timestamp
      return timestamp
    }else{
      timestamp = Date.now()
      if (timestamp <= this.lastTimestamp){
        timestamp = this.lastTimestamp + 1
      }
      this.lastTimestamp = timestamp
      console.log("kana 2")
      return timestamp
    }        
  }
}
  
window.KeyGenerator = KeyGenerator
