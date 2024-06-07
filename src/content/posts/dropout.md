---
title: "[Paper Review] Dropout"
author: Astro Learner
description: "Dropout, 'Improving neural networks by preventing co-adaptation of feature detectors' (2012)"
image:
  url: ""
  alt: ""
pubDate: 2018-06-05
tags: ["paper review"]
---

Review: 신경망에서 드롭아웃에 관한 첫번째 논문이다. 이후 정리한 논문이 더 자세한 것 같다. 학습단계에서 무작위로 은닉층의 뉴런, 특징추출기 중 절반을 생략한다. 이를 통해 드롭아웃이 미적용된 망에서 보이던 동조화 현상이 현저히 줄어드는 것을 보았고, 자체적으로 앙상블 모델과 같은 모델 평균 효과를 보여준다. 이 두 작용을 통해 과최적화, Overfitting을 방지하는 결과를 보여준다.

<!--more-->

# Dropout: Improving neural networks by preventing co-adaptation of feature detectors

- References
  - Hinton, Geoffrey E., et al. "Improving neural networks by preventing co-adaptation of feature detectors." (2012). [[pdf]](https://arxiv.org/pdf/1207.0580.pdf)

**Abstract**

- 작은 데이터셋으로 feedforward 뉴럴넷을 학습시켰을 시, 테스트셋에서 성과가 저조하다. 이런 "과적화(Overfitting)"는, 각각의 트레이닝 케이스(예시: mini batch)마다 무작위로 절반의 특징추출기(feature detectors)를 생략하는 "드롭아웃(dropout)"을 통해 줄일 수 있다. 이 방법은 특징추출기들의 동조화(co-adaptation)을 막는다.
- Dropout을 적용했더니, 음성 인식과 이미지 인식에서 향상된 결과를 보였다.
- Co-adaptation, 동조화: 특정 뉴런의 가중치나 바이어스가 큰 값을 갖게 되면, 그 특정 뉴런의 영향이 커지면서 다른 뉴런들의 학습 속도가 느려지거나 학습이 제대로 진행되지 못하는 경우.

**Overfitting의 원인에 관하여**

- feedforward neural network(input units + hidden units + output units)는 입력층과 은닉층 그리고 출력층으로 구성된다. 은닉층은 입력층에 입력된 값은 바탕으로 가중치를 조정하고 출력층이 정확한 출력을 예측하게 특징추출기를 학습한다.
- 입력과 출력의 관계가 복잡하거나 라벨링된 학습데이터가 부족하다면, 모델은 트레인셋에 특화되므로 테스트셋에서 아주 저조한 성과를 보일 것이다. 이를 "Overfitting"이라고 한다.

**Dropout의 장점과 기능 2가지**

- 드롭아웃은 학습데이터의 복잡한 co-adaptatio을 방지하여 overfitting을 방지한다.
  - 일정한 training case(예: mini-batch)마다 은닉뉴런을 무작위로 50% 확률로 생략시킨다. 이를 통해 은닉뉴런들이 특정 혹은 다른 은닉뉴런에 동조하는 것을 막을 수 있다.
- 드롭아웃을 보는 다른 관점으로, 모델 평균효과(model averaging)를 들 수 있다.
  - 테스트셋에서 에러를 줄이는 방법으로 앙상블, 여러 다른 형태의 네트워크의 결과를 평균내는 방법이 있다. 하지만 이 방법은 너무 비용이 크다.
  - 드롭아웃은 적절한 시간을 들여 다양한 망을 학습하게 해준다.

**Regularization 적용에 관하여**

- 드롭아웃 뉴럴넷에는 기본적으로 SGD와 mini-batch training case를 적용했으나, L2 norm 대신 다른 패널티 방식, Regularization 방식을 적용했다. (Max norm 방식)
  - 은닉레이어에 L2 norm이 적용된, 가중치 벡터에 상한치(upper boundary)를 적용하여 이를 넘지 못하게 했다.
  - 이 방식을 통해 가중치가 너무 커지는 것을 방지하여, learning rate을 큰 값부터 사용하는 것이 가능하게 되고, 학습 속도를 빠르게 할 수 있게 되었다.

**Mean network 효과(평균 망 효과)에 대하여**

- 테스트 시에는, 모든 은닉뉴런을 사용했지만 그 가중치를 절반으로 줄였다.
- ... (이부분 잘 이해안됨)

**MNIST 적용 결과**

- MNIST
  - 60,000 28x28 training images of individual hand written digits
  - 10,000 test images
- 기존 feedforward 신경망을 통한 테스트셋에서 160 errors
- 드롭아웃 50%, max norm 적용하여 130 errors
- - 20%의 픽셀에 드롭아웃을 적용하여 110 errors

**MNIST Pre-trianing과의 조합**

- 50% 드롭아웃과 작은 학습율, 가중치제한 없이 pre-trained 모델에 적용하여, 118 errors에서 92 errors로 결과 향상.
- 이외 이어서 미적용모델과 적용모델을 계속 학습시켰으나, 드롭아웃 적용 모델이 더 성능이 좋았음.

**TIMIT 적용 결과**

- TIMIT
  - 짧은 단어로 이루어진 음성 데이터셋
- 당시에 음성인식에 hidden Markov models을 사용함. 자세한 내용은 생략...
- 총 4개의 FC 은닉층에 4000개의 뉴런, 185개의 softmax 출력뉴런으로 39개의 라벨을 분류함
- 암튼 드롭아웃을 적용하여 22.7%에서 19.7%로 성능 향상

**CIFAR-10 적용 결과**

- CIFAR-10
  - 50,000 32x32 training images of color object
  - 10,000 test images with 10 classes
- 구형 망을 통한 테스트에서 18.5%
- 3 Convolution layers + 3 Max-pooling layers + 1 locally connected layers, 16.6%
- - dropout in last hidden layer 15.6%

**ImageNet**

- ImageNet(2010)
  - 1000 images on each 1000 classes
- 5 Conv. layer with max-pooling layer + 2 globally connected layers + 1000 way softmax layer. + 가중치제한 + 50% 드롭아웃. 47.2% -> 42.4%

**Reuters**

- Reuters dataset(로이터 통신 데이터셋)
  - 201,369 docs with 50 상호배타적인 classes
- 50% 드롭아웃 적용. 31.05% -> 29.62%

**실험에 의한 dropout 평가**

- 확실히 dropout 적용시 성능이 좋아짐.
  - FC의 모든 은닉층에 적용함이 하나의 은닉층에 적용함 보다 성능향상에 좋음.
  - 극단적인 드롭아웃 적용은 성능을 저하시킴. 그래서 0.5 씩 적용함.
  - 입력에도 드롭아웃 적용 시, 성능향상에 도움을 주기도 함.
  - validation set의 결과를 보고 각 은닉층과 입력층에 적용하는 드롭아웃율을 조절하는 방법도 가능함.

**기타 논의**

- 학습 데이터로 얻은 사후 확률로 각 모델의 가중치를 정하는 베이지안 모델 평균방식보다, 드롭아웃은 적용하기 더 단순하다.
  - 복잡한 모델에서, 베이지안 방식은 사후 확률분포에서 모델을 샘플링하는데에 마코프 체인 몬테 카를로 방법을 사용한다.
  - 반면, 드롭아웃은 각 모델이 0.5의 확률로 같은 중요도로 결합되고, 학습 시 이런한 점이 전제된다.
  - 테스트에서, 드롭아웃의 결정은 각 단위에 독립적이므로 mean net을 통한 단일 통과를 사용하여 지수함수적으로 다양한 dropout망의 결합 옵션을 최적화하는 것이 쉽다. (한번에 통과하면서 좋은 성능을 보여줄 수 있따?)
- 베이지안 모델 평균의 대안으로 "bagging"이 있다.
  - 드롭아웃은 극단적인 형태의 bagging이라고 볼수 있다. 한번의 학습에 각 모델의 파라미터는 다른 모델의 파라미터와 공유하며 강하게 정규화된다.
- 양성 생식 진화 이론과 견주어 비교해 볼 수 있다.
