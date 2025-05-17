// src/ErrorBoundary.jsx
import React from 'react'

export default class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(err) {
    return { hasError: true, error: err }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
          <pre className="text-sm text-red-600">{this.state.error.toString()}</pre>
        </div>
      )
    }
    return this.props.children
  }
}
