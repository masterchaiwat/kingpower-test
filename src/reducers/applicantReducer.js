const initFormValue = {
  id: 4,
  title: '',
  fname: '',
  lname: '',
  birthDate: '',
  nationality: '',
  cid: '',
  cid_s1: '',
  cid_s2: '',
  cid_s3: '',
  cid_s4: '',
  cid_s5: '',
  gender: '',
  phoneCountry: 'th',
  mphone: '',
  expSalary: '',
  passportNo: ''
};

const initialState = {
    form : initFormValue,
    isEdit: false,
    selectionIds: [],
    req_list : [
      {
          id: 1,
          title: 'Mr',
          fname: 'Ratvadee',
          lname: 'Sagarik',
          birthDate: new Date(),
          gender: 'Female',
          phoneCountry: 'th',
          mphone: '562012522',
          nationality: 'Thai',
          cid: '1640600087819',
          passportNo: 'xxxx',
          expSalary:  'yyy'
      },
      {
          id: 2,
          title: 'Ms',
          fname: 'Gansadan',
          lname: 'poosee',
          birthDate: new Date(),
          gender: 'Male',
          phoneCountry: 'th',
          mphone: '65757657',
          nationality: 'Thai',
          cid: '365047729841',
          passportNo: '',
          expSalary:  ''
      },
      {
          id: 3,
          title: 'Mrs',
          fname: 'Risa',
          lname: 'Pansakul',
          birthDate: new Date(),
          gender: 'Unisex',
          phoneCountry: 'th',
          mphone: '7763445435',
          nationality: 'Thai',
          cid: '512421543657',
          passportNo: '',
          expSalary:  ''
      }
    ]
};

export default function ApplicantReducer(state = initialState, action) {
    
    switch (action.type) {
        case 'grid/selectionIds': {
          //selection check
          if(action.check){
            if(state.selectionIds.indexOf(action.id) > -1){
              return state;
            }
            else{
              return {
                ...state,
                selectionIds : [
                  ...state.selectionIds,
                  action.id
                ]
              }
            }
          }
          //selection uncheck
          else{
            return {
              ...state,
              selectionIds : state.selectionIds.filter(v=>v!==action.id)
            }
          }
          
        }
        case 'grid/selectionIdsAll': {
          //select all
          if(action.check){
            return {
              ...state,
              selectionIds : state.req_list.map(d=>d.id)
            }
          }
          //un select all
          else{
            return {
              ...state,
              selectionIds : []
            }
          }
        }
        case 'grid/deleteSelection': {
          return {
            ...state,
            form : initFormValue,
            req_list: state.req_list.filter(rec=> state.selectionIds.indexOf(rec.id) === -1)
          }
        }
        case 'form/setFormValue': {
          return {
            ...state,
            form : {
              ...state.form,
              [action.fieldName] : action.fieldValue
            }
          }
        }

        case 'form/initFormValue': {
          return {
            ...state,
            form : initFormValue
          }
        }

        case 'reg/deleteApplicant': {
          return {
            ...state,
            form : initFormValue,
            req_list: state.req_list.filter((rec) => rec.id !== action.payload.id),
          }
        }
        case 'reg/editApplicant': {
          return {
            ...state,
            form : {
              ...action.payload,
              cid_s1: action.payload.cid.substring(0,1),
              cid_s2: action.payload.cid.substring(1,5),
              cid_s3: action.payload.cid.substring(5,10),
              cid_s4: action.payload.cid.substring(10,12),
              cid_s5: action.payload.cid.substring(12,13)
            },
            isEdit: true,
          }
        }
        case 'reg/addNewApplicant': {
            return {
              ...state,
              req_list: [
                ...state.req_list,
                action.payload
              ]
            }
        }
        case 'reg/addOrUpdateApplicant': {
          let exists = false;
          state.req_list.map((rec) => {
            if (rec.id === action.payload.id) {
              exists = true;
            }
            return rec;
          });

          if(exists){
            const nstate = {
              ...state,
              isEdit: false,
              req_list : state.req_list.map((rec) => {
                if (rec.id === action.payload.id) {
                  return action.payload;
                }
                
                return rec;
              }),
            };

            localStorage.setItem('applicant', JSON.stringify(nstate.req_list));
            return nstate;
          }
          else{
            const nstate = {
              ...state,
              isEdit: false,
              req_list: [
                ...state.req_list,
                action.payload
              ]
            }
            localStorage.setItem('applicant', JSON.stringify(nstate.req_list));
            return nstate;
          }
        }

        case 'reg/loadApplicant': {
          return {
            ...state,
            req_list: action.payload
          }
        }

      default:
        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        return state
    }
  }