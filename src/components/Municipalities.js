import * as React from "react";
import { 
  List,
  NumberField,
  SimpleList, 
  Datagrid,
  TextField
} from 'react-admin';
import { useMediaQuery } from '@material-ui/core';

export const MunicipalityList = (props) => {
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <List 
      {...props}
      title="Municipios"
      bulkActionButtons={false}
      actions={null}
    >
      {isSmall ? (
        <SimpleList
          primaryText={record => record.name}
          secondaryText={record => `${record.totalVotes} votos`}
          tertiaryText={record => `${record.participation} %`}
        />
      ) : (
        <Datagrid>
          <TextField label="Municipio" source="name" />
          <NumberField label="Electores" source="totalElectors" />
          <NumberField label="Votantes" source="totalVotes" />
          <NumberField label="Participación (%)" source="participation" />
        </Datagrid>
      )}
    </List>
  );
};
