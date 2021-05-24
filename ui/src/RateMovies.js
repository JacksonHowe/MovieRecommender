import {useState, useContext, useEffect} from 'react'

import {Heading} from '@instructure/ui-heading'
import {Button} from '@instructure/ui-buttons'
import {Spinner} from '@instructure/ui-spinner'
import {Text} from '@instructure/ui-text'
import {View} from '@instructure/ui-view'
import {Tooltip} from '@instructure/ui-tooltip'

import {showAlert, doFetch} from './utils'
import UserContext from './userContext'
import Attribution from './Attribution'

const RateMovies = () => {
  const {user} = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [movie, setMovie] = useState(null)

  const fetchMovie = () => {
    setLoading(true)
    doFetch('/movie', 'GET', user.token)
      .then(setMovie)
      .catch(err => showAlert(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchMovie()
    // Only load the first movie on render since we'll request more on-demand
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const rateMovie = rating => {
    fetchMovie()
  }

  const Separator = () => (
    <hr
      style={{
        border: 'none',
        borderTop: '1px #CCCCCC solid',
        height: '1px'
      }}
    />
  )

  return (
    <>
      <Text as="div" color="secondary">
        We'll show you some details about movies you might like below. Where possible, we'll include a trailer and synopsis. Rate each movie, and we'll recommend movies that you and your partner both liked.
      </Text>
      {loading ? (
        <View as="div" margin="medium" textAlign="center">
          <Spinner renderTitle="Loading movie" />
        </View>
      ) : movie ? (
        <>
          <Heading level="h3" margin="medium 0 small">{movie.title}</Heading>
          <Text as="div">{movie.overview}</Text>
          <View as="div" margin="small 0">
            <Text weight="light">{movie.releaseDate}</Text>
          </View>
          <View as="div" margin="medium 0">
            {movie.trailerUrl ? (
              <iframe
                width="500"
                height="300"
                src={movie.trailerUrl}
                title={`Trailer for ${movie.title}`}
                frameBorder="0"
                allowFullScreen
              />
            ) : (
              <Text fontStyle="italic">No trailer available</Text>
            )}
          </View>
          <Separator />
          <Heading level="h4" margin="small xx-small 0">Rate {movie.title}</Heading>
          <View display="block">
            <Tooltip renderTip="Dislike / Wouldn't watch">
              <Button
                margin="small xx-small"
                onClick={() => rateMovie(-1)}
              >
                -1
              </Button>
            </Tooltip>
            <Tooltip renderTip="Like / Might watch">
              <Button
                margin="small xx-small"
                onClick={() => rateMovie(1)}
              >
                +1
              </Button>
            </Tooltip>
            <Tooltip renderTip="Definitely like / Let's watch it!">
              <Button
                margin="small xx-small"
                onClick={() => rateMovie(2)}
              >
                +2
              </Button>
            </Tooltip>
          </View>
          <Separator />
        </>
      ) : (
        <Button color="primary" margin="large 0" onClick={() => fetchMovie()}>
          Load Movie
        </Button>
      )}
      <Attribution />
    </>
  )
}

export default RateMovies
