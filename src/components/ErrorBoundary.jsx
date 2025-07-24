import React from 'react';
import Card from './Card';
import Button from './Button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Card className="p-6">
            <div className="text-center py-8">
              <div className="text-red-500 text-6xl mb-4">🚨</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Something went wrong
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                An unexpected error occurred. Please try refreshing the page.
              </p>
              <div className="space-x-4">
                <Button 
                  onClick={() => window.location.reload()} 
                  variant="primary"
                >
                  Refresh Page
                </Button>
                <Button 
                  onClick={() => this.setState({ hasError: false, error: null })} 
                  variant="secondary"
                >
                  Try Again
                </Button>
              </div>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 