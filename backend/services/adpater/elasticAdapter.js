module.exports = class ElasticAdapter {
  static adapt(results) {
    const data= results?.hits?.hits

    if(data?.length===0){
        return []
    }
    console.log(data);

    return data.map((item) => {
      return {...item._source,_id:item._id};
    });
  }

  formateUserData(data) {}

  formateArticles(data) {}
};
