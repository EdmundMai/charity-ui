import { from, of } from "rxjs";
import { mergeMap, map, catchError } from "rxjs/operators";
import { ofType, combineEpics } from "redux-observable";

import charityApi from "../../services/charity-api";
import charityActions from "../actions/charity-actions";

const fetchCharitiesEpic = action$ =>
  action$.pipe(
    ofType(charityActions.FETCH_CHARITIES_REQUEST),
    mergeMap(action =>
      from(charityApi.index()).pipe(
        map(charityActions.fetchCharitiesSuccess),
        catchError(error => of(charityActions.fetchCharitiesError(error)))
      )
    )
  );

export default combineEpics(fetchCharitiesEpic);
