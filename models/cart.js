
module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.Teste22 = oldCart.Teste22 || 0;
    this.totalQty = oldCart.totalQty || 0;
    this.totalprice = oldCart.totalprice || 0;

    this.add = function (item, id,qtyC ) {
        var storedItem = this.items[id]
        if (!storedItem) {

            storedItem = this.items[id] = { item: item, qtyC: qtyC, preco: 0 }

        }

    

        storedItem.qtyC;
        storedItem.preco = storedItem.item.preco * storedItem.qtyC;
        this.totalQty = qtyC;
        this.totalprice += storedItem.item.preco * storedItem.qtyC
        this.Teste22 = storedItem.item._id
         
    
    
    
    
    
    
    
    
    
          }

          this.removeItem = function(id){
              this.totalQty-= this.items[id].qtyC
              this.totalprice -= this.items[id].preco;
              delete this.items[id]
          }

     this.generateArray = function () {
        var arr = []
        for (var id in this.items) {


            arr.push(this.items[id])
        }
        return arr;
    }



}