module.exports = {
    apiUrl: 'http://localhost:3001/graphql',
    queries: {
        getClients: `{
                clients{
                    name
                  }
            }`,
        addClients: `{

        }`,
        user: `{
            user{
                id
            }
        }`
    },
    mutations: {

    },
    url : 'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
    urlShows : 'https://api.themoviedb.org/3/trending/tv/day?language=en-US',
    options : {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTBlNzgyNTQ4NjU4NGM3ZTI0Njc5YWFjYjM1MmJhMyIsInN1YiI6IjY0ZmUxZGQ1ZmE0MDQ2MDBlMTdlODA3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WweAe8qnOQUW_jWsn9B8cswZbxukEXaWwz10AXlhAv8'
        }
    }
}