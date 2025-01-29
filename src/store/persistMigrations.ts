import { ApplicationState } from './reducers'
import { initialState as baseSettingInitState } from './slices/baseSetting'

/**
 * Redux store migrations.
 */
export default {
  2: (state: ApplicationState): ApplicationState => {
    return {
      ...state,
      baseSetting: {
        ...state.baseSetting,
        exchange: baseSettingInitState.exchange,
        chartOptions: baseSettingInitState.chartOptions,
        chartType: baseSettingInitState.chartType,
      },
    }
  },
  3: (state: ApplicationState): ApplicationState => {
    return {
      ...state,
      baseSetting: {
        ...state.baseSetting,
        launchScreen: 'Home',
      },
      globalState: {
        ...state.globalState,
        activeTabName: 'Home',
      },
    }
  },
}
