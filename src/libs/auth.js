export function checkPageAuth(aPages, sCurrentPage){
  let aPagesName = ['home','pos'];
  for(let item of aPages){
    for(let subItem of item.sub) {
      aPagesName.push(subItem.name)
    }
  }
  return aPagesName.indexOf(sCurrentPage)!==-1;
}
