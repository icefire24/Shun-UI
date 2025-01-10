import { create } from "zustand"
const middleware = (fn: (...args: any[]) => void) => {
  return (set, get, store) => {
    const newSet = function (...args: any[]) {
      console.log("newSet", args)
      return set(...args)
    }
    return fn(newSet, get, store)
  }
}
export const useStore = create(
  middleware((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 }))
  }))
)

const createStore = (createState) => {
  let state
  const listeners = new Set()

  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial

    if (!Object.is(nextState, state)) {
      const previousState = state

      if (!replace) {
        state = typeof nextState !== "object" || nextState === null ? nextState : Object.assign({}, state, nextState)
      } else {
        state = nextState
      }
      listeners.forEach((listener) => listener(state, previousState))
    }
  }

  const getState = () => state

  const subscribe = (listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  const destroy = () => {
    listeners.clear()
  }

  const api = { setState, getState, subscribe, destroy }

  state = createState(setState, getState, api)

  return api
}

function useStore(api, selector) {
  const [, forceRender] = useState(0)
  useEffect(() => {
    api.subscribe((state, prevState) => {
      const newObj = selector(state)
      const oldobj = selector(prevState)

      if (newObj !== oldobj) {
        forceRender(Math.random())
      }
    })
  }, [])
  return selector(api.getState())
}

export const create = (createState) => {
  const api = createStore(createState)

  const useBoundStore = (selector) => useStore(api, selector)

  Object.assign(useBoundStore, api)

  return useBoundStore
}
