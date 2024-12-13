import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Provider } from 'react-redux';
import store from './store';
import 'normalize.css'

// import zh_CN from 'antd/es/locale/zh_CN'
import zh_CN from 'antd/lib/locale/zh_CN'
import { ConfigProvider } from 'antd'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <ConfigProvider locale={zh_CN}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
)
