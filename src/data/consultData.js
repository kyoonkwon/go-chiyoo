const consultData = [
	
	[{
		level: 30,
		symptom:[
			"아직까지 성능의 저하가 크지 않습니다.",
			"흡입측 배관의 부식이 곧 시작됩니다.",
			"소화수의 이물질이 생기기 시작합니다."
		],
		consult:[
			"스트레이너 여과망을 분리하여 청소합니다.",
			"소화수 전체를 빼주고 새로 채워 넣습니다.",
			"정기적인 시험작동으로 기능이 원활한 지 점검합니다."
		]
	},
	{
		level: 61,
		symptom:[
			"노후로 인한 펌프성능의 변화가 수치로 나타나기 시작합니다.",
			"흡입측 배관의 부식이 가속화됩니다.",
			"옥내소화전과 스프링클러가 작동하지 않을 가능성이 존재합니다."
		],
		consult:[
			"스트레이너 여과망을 분리하여 청소 또는 교체합니다.",
			"흡입측 배관 내부 부식 상태를 점검합니다.",
			"가압송수장치(펌프) 성능시험을 시행합니다."
		]		
	},
	{
		level: 101,
		symptom:[
			"소화수가 흡입되지 않아 펌프 고장이 발생합니다.",
			"배관에 구멍이 생겨 누수가 발생될 수 있습니다.",
			"펌프가 고착되어 작동하지 않을 가능성이 큽니다.",
			"화재 시 옥내소화전이나 스프링클러가 작동하지 않을 가능성이 농후합니다."
		],
		consult:[
			"스트레이너를 교체합니다.",
			"가압송수장치 임펠러 부식상태 확인 및 교체 바랍니다.",
			"소화펌프 및 배관 부식도를 확인해 수리 또는 교체 바랍니다."
		]		
	}],
	
	
	
	
	
	[
		{
		level: 21,
		symptom:[
			"이물질 등으로 화재 시 감지가 지연될 수 있습니다.",
			"감지기 오작동이 일어날 가능성이 있습니다.",
		],
		consult:[
			"열감지기의 외관 상태를 점검합니다.",
			"연기감지기의 이물질을 제거합니다.",
		]
	},
	{
		level: 41,
		symptom:[
			"화재 시 감지시간이 현저하게 늘어나게 됩니다.",
			"감지기 오작동이 빈번하게 발생하게 됩니다.",
		],
		consult:[
			"열감지기 성능 시험을 실시합니다.(한국소방산업기술원/샘플)",
			"연기감지기 성능 시험을 실시합니다.(한국소방산업기술원/샘플)",
			"노후된 감지의 교체를 권고합니다."
		]		
	},
	{
		level: 101,
		symptom:[
			"화재를 제대로 감지하지 못 해 화재피해가 늘어날 가능성이 있습니다.",
			"감지기의 신호가 수신기에 전송되지 않을 가능성이 큽니다.",
		],
		consult:[
			"감지기를 교체 해야 합니다.(아날로그식감지기를 권고합니다.)",
			"화재감지기의 회로선을 점검하고 수리합니다."
		]		
	}],
	
	
	
	
	
	[{
		level: 40,
		symptom:[
			"부식으로 인해 지지력이 약해집니다.",
			"부식된 부분에 성능저하가 급격하게 일어납니다.",
		],
		consult:[
			"녹 제거 및 방청 도장을 실시합니다.",
			"선제적인 구조진단(권고)을 통해 하중에 의한 추락을 예방합니다.",
		]
	},
	{
		level: 76,
		symptom:[
			"발코니 기능의 급격한 저하로 위험성이 증가합니다.",
			"해안가 지역에서는 도시지역보다 훨씬 더 부식이 심해집니다."
		],
		consult:[
			"발코니 교체 또는 보강을 권고합니다.",
			"시급한 구조진단(필수)을 통해 하중에 의한 추락을 예방해야 합니다.",
		]		
	},
	{
		level: 101,
		symptom:[
			"발코니의 기능이 거의 상실됩니다.",
			"급격한 하중의 변화로 인해 붕괴의 위험이 농후합니다.",
		],
		consult:[
			"발코니 교체를 강력하게 요구합니다.",
			"발코니를 제거하고 부속실 설치를 권고합니다.",
		]		
	}]
	
];

export default consultData;