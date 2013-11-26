Harold::Application.routes.draw do
  root 'welcome#index'


  resources 'commercials', only: ['index']
  resources 'underwear', only: ['index']

  resources 'admin', only: ['index']
  get 'admin/create', to: 'users#new'
  get  'admin/login', to: 'sessions#new', as: 'login'
  post 'admin', to: 'users#create'

  namespace 'admin' do
    get 'commercials/fetch', to: 'projects#fetch'
    resources 'projects', path: 'commercials'
  end
end
