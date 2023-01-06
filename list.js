import fs from 'fs';
import fetch from 'node-fetch';

const whiteList = JSON.parse(fs.readFileSync('C://bot/WL.json'));
console.log(whiteList.length)


//vvvqqq(whiteList).then(r => {})
async function vvvqqq(whiteList) {
    await vvv(whiteList).then(resp =>{
       // console.log('xxxx',resp)
    })

}
let tokenInfo = []
async function vvv(whiteList) {
    let eee =  new Promise(async (resolve, reject) => {
        let res = []
         await Object.entries(whiteList).forEach(([key, value]) => {
                 if (value[1] === 0 || value[2] === 0) {
                     setTimeout(async function () {
                         let response = await fetch("https://aywt3wreda.execute-api.eu-west-1.amazonaws.com/default/IsHoneypot?chain=bsc2&token=" + key);
                         const data = await response.json();
                         if (data.BuyTax !== 0 || data.SellTax !== 0) {
                             return
                         } else {
                             let zzz = await requestTokens(key,value[0])
                              res.push(zzz)
                             //   resolve(res)
                           //  console.log(res[0])
                         }
                     }, 3000)

                 }
        })
       // console.log('eee',eee)
    return eee

    })
}

console.log('tokenInfo',tokenInfo)
if (tokenInfo.length !== 0) {
    //let ccc = await file(obj)
    await fs.promises.writeFile("./test.json", JSON.stringify(tokenInfo))
        .then((res) => {
        });
}

async function requestTokens(key,tokenAddress){
    return new Promise(async (resolve, reject) => {
        let response = await fetch("https://www.dextools.io/shared/data/pair?address="+tokenAddress.toLowerCase()+"&chain=bsc");
        const dataToken = await response.json();
        //console.log(dataToken)
       let obj = [];
            if (dataToken.data[0].id.exchange === 'pancakev2' && dataToken.data[0].symbolRef === 'WBNB') {
            if (dataToken.data[0].metrics !== undefined) {
                let datet = new Date();
                let date = new Date(dataToken.data[0].creationTime);
                if (!isNaN(date.getMonth())){
                    let ssr = date.getMonth() < datet.getMonth() -2
                    if (ssr) {
                        if (dataToken.data[0].dextScore.total >= 40) {
                               // obj.push({[tokenAddress]: [dataToken.data[0].id.pair, 0, 0, dataToken.data[0].metrics.reserveRef]})
                           if (Math.ceil( dataToken.data[0].metrics.reserveRef) > 10){
                                 Object.assign(obj,{[key]: [dataToken.data[0].id.pair, 0, 0, dataToken.data[0].metrics.reserveRef]})
                                console.log(obj)
                                resolve(obj)
                              }
                            }
                        }else {return}
                    }else {return}
                }else {return}
            }

    })
}
async function file(obj,tokenAddress){
    return new Promise(async (resolve, reject) => {
        // console.log('obj',obj)
        // console.log('tokenAddress',tokenAddress)
        await fs.promises.writeFile("./test.json", JSON.stringify(obj))
            .then((res) => {
                //  let tkInfo =  parseToken(obj[0], tokenAddress);
                // console.log('tkInfo', tkInfo)
                resolve(obj);
            });
    })
}
