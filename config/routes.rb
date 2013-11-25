Harold::Application.routes.draw do
  root 'welcome#index'

  resources 'commercials', only: ['index']
  resources 'underwear', only: ['index']
end
