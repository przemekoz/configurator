import React from 'react';
import { Admin, Resource } from 'react-admin';
import BookIcon from '@mui/icons-material/Book';
import UserIcon from '@mui/icons-material/Group';
import ElementIcon from '@mui/icons-material/PieChart';
import { dataProvider } from './dataProvider';
import { ClientList } from './Client/ClientList';
import { ClientEdit } from './Client/ClientEdit';
import { ClientCreate } from './Client/ClientCreate';
import { DictionaryList } from './Dictionary/DictionaryList';
import { DictionaryEdit } from './Dictionary/DictionaryEdit';
import { DictionaryCreate } from './Dictionary/DictionaryCreate';
import { ElementList } from './Element/ElementList';
import { ElementEdit } from './Element/ElementEdit';
import { ElementCreate } from './Element/ElementCreate';
import './App.css';


const App = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="elements" list={ElementList} edit={ElementEdit} create={ElementCreate} icon={ElementIcon} />
        <Resource name="clients" list={ClientList} edit={ClientEdit} create={ClientCreate} icon={UserIcon} />
        <Resource name="dictionaries" list={DictionaryList} edit={DictionaryEdit} create={DictionaryCreate} icon={BookIcon} />
    </Admin>
);

export default App;
