
module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.Teste22 = oldCart.Teste22 || 0;
    this.totalQty = oldCart.totalQty || 0;
    this.totalprice = oldCart.totalprice || 0;

    this.add = function (item, id,cep) {
        var storedItem = this.items[id]
        if (!storedItem) {

            storedItem = this.items[id] = { item: item, qty: 0, preco: 0 }

        }
        storedItem.qty++;
        storedItem.preco = storedItem.item.preco * storedItem.qty;
        this.totalQty++;
        this.totalprice += storedItem.item.preco
        this.Teste22 = storedItem.item._id
         
    
    
    
    
    
    
    
    
    
          }

          this.removeItem = function(id){
              this.totalQty-= this.items[id].qty
              this.totalprice -= this.items[id].item.preco;
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