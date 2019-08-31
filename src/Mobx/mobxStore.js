import {observable} from 'mobx'

export class MemberStore {

  @observable email = ''
  @observable password = ''
  @observable borderColor = 'transparent'

  @observable SelectedNumber = ''
  @observable SelectedRegion = ''
  @observable reply = 15
  @observable amazonData = []
  @observable pressedDate1 = []
  @observable pressedDate2 = []

  @observable pressedDate = []

  @observable notes


  @observable selectedButtonOne: null
  @observable commentName = ''
  @observable commentNameUpdate = ''
  @observable selectPet = ''


  @observable registeredPet = ''

  @observable addPet = []



//반려동물정보
@observable petName = []
@observable petBB = ''
@observable petType = ''
@observable petSex = ''
@observable petCareStatus = ''


@observable requestDate = []
@observable requestRegion1 = ''
@observable requestRegion2 = ''
@observable requestRegion3 = ''

@observable memberObject
@observable requestObject
@observable reviewObject

@observable myPetList = []
@observable sentRequest = []

@observable PriceScreenIdx = ''
@observable reviewList = []


@observable requestPetName = ''
@observable phoneCode = ''


//마이펫 설정시 임시 저장 스토어
@observable petTypeSetting = ''
@observable petGenderSetting = ''
@observable petNeutralSetting = ''
@observable petVaccinSetting = ''

@observable petListSetting = ''
@observable petKindSetting = ''
@observable petNameSetting = ''

@observable newDogcat = ''
@observable newgender = ''
@observable newNeutral = ''
@observable newVaccin = ''


@observable bookingPetName = ''
@observable bookingRegDate = ''
@observable bookingMedicalKind = ''
@observable bookingPetIdx = ''

@observable visible = ''

@observable replyComment = ''
@observable kakaoIdx = ''
@observable reviewConvert =[]
@observable imageSplice = []
@observable reviewDetailIamge = []

//강아지고양이 필터링
@observable filterDogList = []
@observable filterCatList = []

@observable filterDog = ''
@observable filterCat = ''
//중성화 필터링
@observable filterNeuterList = []
@observable filterNeuter = ''

//슬개골 필터링
@observable filterBoneList = []
@observable filterBone = ''

//스케일링 필터링
@observable filterScalingList = []
@observable filterScaling = ''

//혈액검사 필터링
@observable filterBloodList = []
@observable filterBlood = ''

//예방접종 필터링
@observable filterInjectionList = []
@observable filterInjection = ''

//모두보기
@observable filterShowAll = true


}

export const store = new MemberStore();
