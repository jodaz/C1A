import * as React from "react";
import { useState, useEffect } from 'react';
import { 
  List, 
  Loading,
  Edit,
  SelectInput,
  Datagrid, 
  TextField,
  Create,
  SimpleForm,
  TextInput,
  EditButton,
  DeleteButton
} from 'react-admin';
import { fetchUsers } from '../fetch';
import { isEmpty } from '../utils';
import { useSelector } from 'react-redux';

const Title = ({ record }) => {
  return <span>{record ? `${record.name}` : ''}</span>;
}

const validateVotationCenter = (values) => {
  const error = {};

  if (!values.name) {
    error.name = 'Ingrese el nombre del centro de votación';
  }
  if (!values.municipality) {
    error.municipality = 'Ingrese el municipio';
  }
  if (!values.parish) {
    error.parish = 'Ingrese el nombre de la parroquia';
  }
  if (!values.user) {
    error.user = 'Seleccione un usuario responsable del centro.';
  }

  return error;
}

export const VotationCentersList = (props) => {
  const user = useSelector(store => store.user.user);

  return (
    <List 
      {...props}
      title="Centros de votación"
      bulkActionButtons={false}
    >
      <Datagrid>
        <TextField label="Nombre" source="name" />
        <TextField label="Municipio" source="municipality" />
        <TextField label="Responsable" source="user.full_name" />
        <TextField label="Parroquia" source="parish" />
        <TextField label="Votos" source="votes" />
        { (user.role === 'ADMIN') && <DeleteButton /> }
        { (user.role === 'ADMIN') && <EditButton /> }
      </Datagrid>
    </List>
  );
};

export const VotationCentersCreate = (props) => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const { response } = await fetchUsers();

    setUsers(response.data);
    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  return (
    <Create {...props} title="Nuevo centro de votación" >
      <SimpleForm validate={validateVotationCenter}>
        <TextInput source="name" label="Nombre" />
        <TextInput source="municipality" label="Municipio" />
        <TextInput source="parish" label="Parroquia" />
        <SelectInput source="user" choices={users} optionText="full_name" optionValue='id' label="Usuario responsable"/>
      </SimpleForm>
    </Create>
  );
};

export const VotationCentersEdit = (props) => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const { response } = await fetchUsers();

    setUsers(response.data);
    setLoading(false);
  }, []);

  const optionRenderer = choice => `${choice.full_name}`;

  if (loading) return <Loading />;

  return (
    <Edit {...props} title={<Title />}>
      <SimpleForm validate={validateVotationCenter}>
        <TextInput source="name" label="Nombre" />
        <TextInput source="municipality" label="Municipio" />
        <TextInput source="parish" label="Parroquia" />
        <SelectInput
          source="user"
          choices={users}
          optionText="full_name"
          optionValue='id'
          label="Usuario responsable"
        />
      </SimpleForm>
    </Edit>
  );
}
