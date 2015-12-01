import Q from 'q'
import request from 'superagent'

const API_ROOT = 'http://api-ghondar.jit.su'

export function fetchList(page) {
  var deferred = Q.defer()
  request
    .get(`${API_ROOT}/movies/releases/?page=${page}`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if(err)
        deferred.reject(new Error(err))
      else {
        const data = res.body
        const meta = {
          total       : data.total,
          per_page    : data.per_page,
          current_page: data.current_page,
          last_page   : data.last_page,
          from        : data.from,
          to          : data.to
        }
        setTimeout(() => {
          deferred.resolve({
            data: data.data,
            meta
          })
        }, 3000)
      }
    })
  return deferred.promise
}
