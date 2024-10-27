Rails.application.routes.draw do
  root 'home#index'
  
  namespace :api do
    get 'placeholder/:width/:height', to: 'placeholder#show'
  end
end