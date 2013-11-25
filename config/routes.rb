Harold::Application.routes.draw do
  root 'welcome#index'

  resources 'commercials', only: ['index']
  resources 'underwear', only: ['index']

  namespace 'admin' do
    resources 'projects', path: 'commercials'
  end
end
